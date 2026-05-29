"""Disease info & pesticide supplements — loaded from data/plant_data.json"""
import json
import os

from classes import IDX_TO_CLASSES, format_label

_DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "plant_data.json")
_PLANT_DATA = None


def _load():
    global _PLANT_DATA
    if _PLANT_DATA is None:
        with open(_DATA_PATH, encoding="utf-8") as f:
            _PLANT_DATA = json.load(f)
    return _PLANT_DATA


def get_recommendation(class_idx: int) -> dict:
    data = _load()
    entry = data.get(str(class_idx), {})
    raw = IDX_TO_CLASSES.get(class_idx, "")
    display = entry.get("disease_name") or format_label(raw)
    healthy = "healthy" in raw.lower()

    return {
        "class_idx": class_idx,
        "raw_label": raw,
        "disease": display,
        "description": entry.get("description", ""),
        "prevention": entry.get("prevention", ""),
        "pesticide": entry.get("supplement_name") or ("No treatment required" if healthy else "Consult local extension"),
        "supplement_name": entry.get("supplement_name", ""),
        "supplement_image": entry.get("supplement_image", ""),
        "buy_link": entry.get("buy_link", ""),
        "reference_image_url": entry.get("reference_image_url", ""),
        "is_healthy": healthy,
        "emoji": "🌿✅" if healthy else "🌾🌱🚜",
    }


def all_class_pills():
    data = _load()
    return [data[str(i)]["disease_name"] for i in range(len(IDX_TO_CLASSES)) if str(i) in data]
