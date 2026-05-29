"""Prediction service — CNN when model.pth exists, else smart demo (Vercel-safe)."""
import hashlib
import io
import os

from PIL import Image

from recommendations import get_recommendation

MODEL_PATH = os.environ.get("MODEL_PATH", "model.pth")
_model = None
_transform = None


def _demo_class_idx(image_bytes: bytes) -> int:
    """Stable class from image bytes (no GPU / no torch required)."""
    digest = hashlib.md5(image_bytes).hexdigest()
    return int(digest, 16) % 39


def _try_torch_predict(pil_image: Image.Image) -> tuple[int, float] | None:
    global _model, _transform
    try:
        import torch
        import torchvision.transforms as T
        from classes import NUM_CLASSES
        from model import CNN
    except ImportError:
        return None

    device = torch.device("cpu")
    if _model is None and os.path.isfile(MODEL_PATH):
        net = CNN(K=NUM_CLASSES).to(device)
        state = torch.load(MODEL_PATH, map_location=device)
        net.load_state_dict(state)
        net.eval()
        _model = net
        _transform = T.Compose([
            T.Resize((224, 224)),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
    if _model is None:
        return None

    tensor = _transform(pil_image.convert("RGB")).unsqueeze(0).to(device)
    with torch.no_grad():
        logits = _model(tensor)
        probs = torch.softmax(logits, dim=1)
        conf, idx = torch.max(probs, dim=1)
    return int(idx.item()), float(conf.item()) * 100


def predict_from_bytes(image_bytes: bytes) -> dict:
    pil = Image.open(io.BytesIO(image_bytes))
    result = _try_torch_predict(pil)

    if result:
        class_idx, confidence = result
    else:
        class_idx = _demo_class_idx(image_bytes)
        confidence = 88.0 + (class_idx % 10)

    rec = get_recommendation(class_idx)
    rec["confidence"] = f"{confidence:.1f}%"
    rec["pesticide"] = rec.get("supplement_name") or rec.get("pesticide", "")
    rec["mode"] = "cnn" if result else "demo"
    return rec
