# Thundr - Quick Start Guide

Your Thundr installation has been successfully upgraded with the modern EmeraldModern UI!

## What's New

- ✨ **Modern React UI** - Beautiful, responsive interface with Radix UI components
- 🎮 **All Your Games Preserved** - 1600+ games are still available
- 🌐 **Multiple Proxy Options** - UV, Scramjet, and Bare server support
- 🤖 **AI Integration** - Built-in AI chat assistant
- ⚡ **Faster Performance** - Vite build system for optimal speed
- 🎨 **Customizable** - Multiple themes and cloaking options

## Installation

1. **Install Dependencies**

Using npm:
```bash
npm install
```

Or using pnpm (recommended):
```bash
pnpm install
```

2. **Configure Environment (Optional)**

Create a `.env` file:
```bash
cp .env.example .env
```

Add API keys for AI features if desired:
```env
OPENROUTER_API_KEY=your_key_here
# or
LLM7_API_KEY=your_key_here
```

3. **Start Development Server**

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:3000 (API server)

The Vite dev server will proxy API requests to the backend automatically.

## Production Deployment

1. **Build the Application**

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

2. **Start Production Server**

```bash
npm start
```

Or:
```bash
node server.ts
```

The server will:
- Serve the built frontend from `dist/`
- Handle API routes
- Manage proxy connections (Bare, Wisp)
- Serve your games via `/api/games`

## Key Features

### Home Page Options

The app supports two home page styles:
1. **Default** - Clean, search-focused interface
2. **Browser** - Tabbed browsing experience with favorites

Change in Settings → Appearance → Site Type

### Proxy Settings

- **Scramjet** - Modern WASM-based proxy (recommended)
- **UV (Ultraviolet)** - Traditional XOR-based proxy
- **Transport** - Choose between libcurl or epoxy

### Games

All 1600+ games from your previous setup are preserved and accessible at:
- Homepage: Click "Games" in navigation
- Direct: http://localhost:3000/games

Games are loaded from `/public/assets/js/json/games.json`

### Cloaking

Protect your browsing with:
- Custom page titles
- Custom favicon
- About:blank cloaking

## File Structure

```
dogeub/
├── src/                    # React source code
│   ├── routes/            # Page routes
│   ├── components/        # UI components
│   └── store.ts           # Settings store
├── public/                # Static assets
│   ├── assets/           # Your original assets
│   ├── scram/            # Scramjet proxy
│   └── uv/               # UV proxy
├── server.ts             # Backend server (Fastify + Bare + Wisp)
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is in use:
```bash
PORT=8080 npm run dev
```

### Dependencies Failed to Install

Try clearing cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

Or use pnpm:
```bash
pnpm install
```

### Games Not Loading

Check that the games JSON exists:
```bash
ls public/assets/js/json/games.json
```

If missing, restore from backup:
```bash
cp /tmp/thundr-games-backup.json public/assets/js/json/games.json
```

### Build Errors

Make sure TypeScript compiles:
```bash
npm run lint
```

Fix any TypeScript errors before building.

## What Was Preserved

✅ **All Games** - games.json with 1600+ games
✅ **All Apps** - apps.json preserved
✅ **Brand Name** - "Thundr" kept throughout
✅ **Proxy Setup** - Bare server integration maintained
✅ **AI Features** - Enhanced with new UI
✅ **Images/Assets** - All logos and images preserved

## What Changed

❌ **Old HTML files** - Moved to `old_public/` (backup)
❌ **Old index.js** - Backed up as `index.js.backup`
✨ **New React App** - Modern component-based architecture
✨ **New Server** - `server.ts` with Fastify + Bare + Wisp
✨ **New Build System** - Vite instead of plain HTML

## Next Steps

1. **Customize Your Theme**
   - Go to Settings → Appearance
   - Change accent color, font, background

2. **Set Up AI**
   - Add API keys to `.env`
   - Test the chat feature

3. **Deploy**
   - Build with `npm run build`
   - Deploy `dist/` folder + `server.ts`
   - Set environment variables on host

## Support

- **Issues?** Check the main README.md
- **Discord:** https://discord.gg/5hETqnGc3e
- **GitHub:** https://github.com/xnoctra/Thundr

---

🎉 Enjoy your upgraded Thundr experience!

