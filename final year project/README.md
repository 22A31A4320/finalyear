# Smart Agro

**Deep Learning Based Pesticides Recommendation Framework for Plant Disease Control**  
Department of CSE (Artificial Intelligence), PEC

## CNN model (your architecture)

- **Input:** 224×224 RGB
- **Output:** 39 classes (`idx_to_classes` in `classes.py`)
- **Layers:** 4× Conv2d blocks → Dropout → Linear(50176, 1024) → Linear(1024, K)

Place trained weights as **`model.pth`** next to `app.py`.

## Run locally

```bash
pip install -r requirements.txt
python app.py
```

Open: http://127.0.0.1:5000

## Public link for friends (Vercel + GitHub)

See **[VERCEL.md](VERCEL.md)** — push to GitHub, connect Vercel, share your `.vercel.app` URL.

Optional full CNN backend: **[DEPLOY.md](DEPLOY.md)** (Render.com + `model.pth`).

## Pages

| Page | File |
|------|------|
| Home / Upload | `home.html` |
| Result | `result.html` |
| Diseases (39 pills) | `disease.html` |
| Pesticides | `pesticides.html` |
| About | `about.html` |
| User Guide | `user-guide.html` |
| Team | `team.html` |

## API

- `POST /api/predict` — form field `image` → JSON result
- `GET /api/classes` — all 39 class labels
