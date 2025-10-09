# Deploy Thundr to Vercel

## ✅ Your app is now Vercel-ready!

The build process has been fixed and your app can now be deployed to Vercel.

## Quick Deploy

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd /Users/rohan/newthundr/dogeub
vercel
```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Vercel will auto-detect settings
   - Deploy!

### Option 2: GitHub + Vercel Dashboard

1. **Push to GitHub:**
```bash
git add .
git commit -m "Upgraded to modern React UI"
git push
```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the Vite project
   - Click "Deploy"

## Build Configuration

Your project is configured with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

**Vercel will automatically:**
- Run `npm install`
- Run `npm run build`
- Serve the `dist/` folder

## Environment Variables (Optional)

If you want AI features on Vercel, add these in the Vercel dashboard:

### Settings → Environment Variables:

```
OPENROUTER_API_KEY=your_key_here
# or
LLM7_API_KEY=your_key_here
LLM7_URL=https://api.llm7.io/v1
```

## Important Notes for Vercel

### ⚠️ Limitations on Vercel Free Tier:

1. **Backend Server:** Vercel is designed for static sites and serverless functions. Your `server.ts` with Fastify/Wisp won't work as-is on Vercel.

2. **What WILL work on Vercel:**
   - ✅ Frontend (React app)
   - ✅ Static games list
   - ✅ All UI features
   - ✅ Basic routing

3. **What WON'T work on Vercel (free tier):**
   - ❌ `/api/games` endpoint (no server)
   - ❌ `/api/chat` endpoint (no server)
   - ❌ Bare/Wisp proxy servers
   - ❌ Real-time WebSocket connections

### 🔧 Solutions:

#### For Static Deployment (Vercel):
The frontend will work perfectly! The games are embedded as external links, so they'll open directly.

####  For Full Features (Recommended):
Deploy to a platform that supports Node.js servers:
- **Railway** - https://railway.app (free tier with servers)
- **Render** - https://render.com (free tier)
- **Fly.io** - https://fly.io
- **DigitalOcean App Platform**
- **Heroku** (paid)

## Test Locally First

Before deploying, test the production build:

```bash
npm run build
npm start
```

Visit http://localhost:3000

## Current Status

✅ **Build works** - `npm run build` completes successfully
✅ **TypeScript compiles** - No errors
✅ **Assets optimized** - Images compressed
✅ **React app bundled** - Ready for production
✅ **Routes configured** - Vercel routing set up

## For Full Proxy + Server Features:

### Deploy to Railway (Recommended):

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login:**
```bash
railway login
```

3. **Initialize:**
```bash
railway init
```

4. **Deploy:**
```bash
railway up
```

Railway will:
- Run `npm install`
- Run `npm run build`
- Start `server.ts`
- Provide a URL with full proxy support

### Or use the Railway Dashboard:
1. Go to https://railway.app
2. Click "New Project"
3. Deploy from GitHub
4. Railway auto-detects Node.js
5. Done!

## Summary

- **Vercel** = Frontend only (fast, CDN, free)
- **Railway/Render** = Full stack (server + proxy, free tier available)

Choose based on what you need! Both options are ready to deploy. 🚀

