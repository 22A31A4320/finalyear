# Deploy Smart Agro on Vercel (GitHub)

Your friends get a public URL like: `https://smart-agro-xxxx.vercel.app`

## Step 1 — Push to GitHub

1. Create a repo on [github.com](https://github.com) (e.g. `smart-agro`)
2. In terminal:

```powershell
cd "d:\final year project"
git init
git add .
git commit -m "Smart Agro — Vercel ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-agro.git
git push -u origin main
```

## Step 2 — Connect Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Add New Project** → Import your `smart-agro` repository
3. Vercel auto-detects settings:
   - **Framework Preset:** Other
   - **Build Command:** leave empty (static + Python API)
   - **Output Directory:** leave empty
   - **Install Command:** `pip install -r requirements.txt` (optional, for Pillow in API)
4. Click **Deploy**

## Step 3 — Share the link

After deploy (~1–2 min), open:

`https://your-project-name.vercel.app`

Share this URL — works on mobile and desktop without installing anything.

## What runs on Vercel

| Part | How |
|------|-----|
| HTML/CSS/JS | Static files from repo root |
| `data/plant_data.json` | All 39 diseases + buy links |
| `/api/predict` | Python serverless (demo mode without `model.pth`) |
| `/api/classes` | Returns all class labels |

### Note on CNN / PyTorch

Vercel free tier is **not suitable** for large PyTorch models. The live site uses **demo prediction** (image-hash → class 0–38) with your real descriptions, pesticides, and buy links.

For **real CNN inference**, run locally with `requirements-local.txt` + `model.pth`, or deploy backend on [Render.com](DEPLOY.md).

## Auto-deploy

Every `git push` to `main` triggers a new Vercel deployment automatically.

## Custom domain (optional)

Vercel → Project → **Settings** → **Domains** → add your domain.
