# Deploy Smart Agro — Public link for friends

## What you need

1. **Trained weights** — Save your PyTorch model as `model.pth` in the project folder (same folder as `app.py`).
2. **GitHub account** (free)
3. **Render.com account** (free) — hosts Flask + your site

## Step 1 — Put model weights

After training, in Python:

```python
torch.save(model.state_dict(), "model.pth")
```

Copy `model.pth` into `d:\final year project\`.

## Step 2 — Push to GitHub

```bash
cd "d:\final year project"
git init
git add .
git commit -m "Smart Agro CNN app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-agro.git
git push -u origin main
```

Create the repo on GitHub first (github.com → New repository → `smart-agro`).

## Step 3 — Deploy on Render (free public URL)

1. Go to [render.com](https://render.com) → Sign up
2. **New +** → **Web Service**
3. Connect your GitHub repo `smart-agro`
4. Settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Instance type:** Free
5. Click **Create Web Service**

Your public link will be like:

`https://smart-agro-xxxx.onrender.com`

Share that link — friends can open it on phone/laptop without any files.

## Step 4 — Upload model (if file is large)

If `model.pth` is too big for GitHub (>100MB), use [Git LFS](https://git-lfs.github.com/) or upload `model.pth` to Render via shell after deploy.

Without `model.pth`, the site still works in **demo mode** (sample predictions).

## Run locally (test before deploy)

```bash
cd "d:\final year project"
pip install -r requirements.txt
python app.py
```

Open: `http://127.0.0.1:5000`

## CNN classes (your model)

All **39 classes** from `idx_to_classes` are in `classes.py` and `js/classes.js`. The UI shows labels like `Apple : Black rot`.
