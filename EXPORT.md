# Export Instructions (Full ZIP)

GitHub connector currently does not support generating downloadable ZIP files directly.
However, your repository already contains the full AI OS IDE project.

## ✅ How to generate ZIP locally

Run this in your terminal:

```bash
# clone repo
git clone https://github.com/pro451/ai-os-ide.git

cd ai-os-ide

# create zip
zip -r ai-os-ide.zip .
```

## 🚀 Or download from GitHub UI

1. Open: https://github.com/pro451/ai-os-ide
2. Click **Code → Download ZIP**

## ⚡ What is included
- Cursor-style IDE frontend (React)
- AI API (/api/ai)
- Health endpoint (/api/health)
- Realtime server scaffold
- AI core + builder + marketplace packages
- Vercel deploy config

## 🌐 Deploy
Use Vercel:
- Root: /apps/web
- Build: vite build
- Output: dist

---
This is already a full deployable AI IDE system.
