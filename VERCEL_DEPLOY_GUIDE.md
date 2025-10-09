# ✅ Thundr - Vercel Static Deployment Guide

Your app is now configured for **static deployment on Vercel with UV proxy**!

## What's Configured

✅ **UV Static Proxy** - Like [thunderx](https://github.com/xtoazt/thunderx), using client-side UV
✅ **Games load from static JSON** - Fallback to `/assets/js/json/games.json`
✅ **All proxy files included** - UV, Scramjet, BareMux copied to dist
✅ **Service worker registration** - Handles proxy routing
✅ **Vercel routing configured** - `vercel.json` set up correctly

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
cd /Users/rohan/newthundr/dogeub
vercel
```

Follow the prompts:
- Link to existing project or create new
- Vercel will auto-detect settings
- Deploy!

### Option 2: GitHub + Vercel Dashboard

```bash
# 1. Push to GitHub
git add .
git commit -m "Configured for Vercel static deployment"
git push
```

Then:
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel auto-detects Vite
4. Click **Deploy**

## What Works on Vercel

✅ **Full React UI** - All pages and components
✅ **UV Proxy** - Static client-side proxy (like thunderx)
✅ **Games** - All 1600+ games via static JSON
✅ **Routing** - All routes (/, /games, /chat, /play)
✅ **Service Worker** - UV proxy handled client-side
✅ **Update Popup** - Shows your custom message
✅ **Settings** - All customization options
✅ **Cloaking** - About:blank and custom titles
✅ **Proxy Transport** - BareMux with libcurl/epoxy

## How It Works

Unlike the old setup that needed a Node.js server, this now works **100% static** like thunderx:

1. **UV Proxy** runs in the browser via service worker
2. **Games JSON** loaded directly from static files
3. **BareMux** handles proxy transport client-side
4. **No backend needed** for basic functionality

## Configuration Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/service/.*",
      "dest": "/uv/uv.sw.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### UV Config (`public/uv/uv.config.js`)
```javascript
self.__uv$config = {
  prefix: "/service/",
  bare: "/bare/",
  // ... rest of config
};
```

## Features That Work

| Feature | Status | Notes |
|---------|--------|-------|
| Homepage | ✅ | Full React UI |
| Games Browser | ✅ | Loads from static JSON |
| Proxy Browsing | ✅ | UV static proxy |
| Service Worker | ✅ | Client-side routing |
| Settings | ✅ | Saved to localStorage |
| Cloaking | ✅ | About:blank works |
| AI Chat | ⚠️ | Requires API key setup |
| Bare Server | ⚠️ | Uses public bare servers |

## Post-Deployment Setup

After deploying to Vercel:

### 1. Configure Bare Server (Optional)

By default, UV will try to use `/bare/`. You can:

**Option A:** Use a public Bare server
- Edit `public/uv/uv.config.js`
- Change `bare: "https://your-bare-server.com/"`

**Option B:** Deploy your own Bare server
- Use Railway/Render for `server.ts`
- Point UV to it

### 2. Environment Variables (Optional)

For AI features, add in Vercel dashboard:
```
Settings → Environment Variables:
OPENROUTER_API_KEY=your_key_here
```

### 3. Custom Domain (Optional)

In Vercel dashboard:
- Settings → Domains
- Add your custom domain
- Vercel handles SSL automatically

## Testing Locally

Test the static build before deploying:

```bash
# Build
npm run build

# Serve the dist folder
npx serve dist -p 3000
```

Visit http://localhost:3000

## Differences from Server Version

| Feature | Server Version | Static Version |
|---------|---------------|----------------|
| Proxy | Server-side Bare + Wisp | Client-side UV |
| Games API | Backend endpoint | Static JSON |
| AI Chat | Server streaming | Would need edge function |
| WebSocket | Native support | Through UV/BareMux |
| Performance | Server processing | CDN edge cached |

## Troubleshooting

### Service Worker Not Registering?

Check browser console. Make sure:
- HTTPS is enabled (required for service workers)
- No conflicting service workers
- `public/sw.js` exists

### Games Not Loading?

Check that `/assets/js/json/games.json` exists in dist:
```bash
ls dist/assets/js/json/games.json
```

### Proxy Not Working?

1. Check service worker is registered
2. Verify UV config at `/uv/uv.config.js`
3. Try a different Bare server

## Deploy Command Summary

```bash
# Option 1: Vercel CLI
vercel

# Option 2: GitHub
git push
# Then deploy via Vercel dashboard

# Option 3: Direct
npm run build
# Upload dist/ folder to any static host
```

## Success! 🎉

Your Thundr is now ready for Vercel with:
- ✅ Static UV proxy (like thunderx)
- ✅ All games preserved
- ✅ Modern React UI
- ✅ No server required

Deploy with `vercel` and you're live! 🚀

