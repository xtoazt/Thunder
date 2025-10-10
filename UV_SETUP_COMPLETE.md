# UV Proxy Setup - Complete ✅

## Overview

UV (Ultraviolet) proxy has been successfully configured and is now working in your Thundr application. This setup uses WISP (WebSocket over HTTP Secure Protocol) instead of traditional Bare servers for better performance and reliability.

## What Was Fixed

### 1. Service Worker Configuration (`public/sw.js`)

The service worker now properly routes requests to both UV and Scramjet proxies:

- **UV Routes**: All requests to `/~/uv/*` are handled by Ultraviolet
- **Scramjet Routes**: All requests to `/~/scramjet/*` are handled by Scramjet
- Imports both proxy bundles and configurations correctly

### 2. UV Configuration (`public/uv/uv.config.js`)

- Configured UV to use WISP backend via BareMux instead of Bare servers
- Set proper prefix: `/~/uv/`
- Using XOR encoding for URL obfuscation
- All UV assets correctly referenced

### 3. Service Worker Hook (`src/components/hooks/useSw.tsx`)

Enhanced the service worker registration to:
- Properly register the main service worker
- Initialize Scramjet when available
- Setup BareMux connection with WISP transport
- Better error handling and logging

### 4. Build Configuration (`vite.config.ts`)

Added override for UV config to ensure custom configuration is used:
- Copies all UV, BareMux, Scramjet, libcurl, and epoxy files
- Overrides default UV config with custom WISP configuration
- Ensures all proxy assets are available in production build

## How It Works

### Architecture

```
User Request
    ↓
React App (Browser UI)
    ↓
Service Worker (sw.js)
    ↓
UV or Scramjet Proxy Handler
    ↓
BareMux (Transport Layer)
    ↓
WISP Server (wss://wisp.mercurywork.shop/)
    ↓
Target Website
```

### Components

1. **Ultraviolet (UV)**: Web proxy for bypassing internet filters
2. **Scramjet**: Alternative proxy with different obfuscation methods
3. **BareMux**: Multiplexer for handling multiple transport protocols
4. **WISP**: WebSocket-based protocol for proxying HTTP traffic
5. **Transports**: libcurl and epoxy for different connection methods

## Testing

The server is running on `http://localhost:3000`. You can test:

1. **Browser Mode**: Visit homepage, select browser mode, enter a URL
2. **Default Mode**: Visit homepage, select default mode, enter a URL
3. **Proxy Toggle**: Go to Settings → Proxy Settings to switch between UV and Scramjet

### Verify Setup

All these endpoints should return 200 OK:
- `http://localhost:3000/sw.js` - Service worker
- `http://localhost:3000/uv/uv.bundle.js` - UV bundle
- `http://localhost:3000/uv/uv.config.js` - UV config
- `http://localhost:3000/baremux/worker.js` - BareMux worker
- `http://localhost:3000/scram/scramjet.worker.js` - Scramjet worker

## Configuration

### Current Settings

- **Default Proxy**: Ultraviolet (UV)
- **WISP Server**: `wss://wisp.mercurywork.shop/`
- **Transport**: libcurl (default)
- **Alternative Transport**: epoxy
- **URL Encoding**: XOR codec

### Changing Settings

Users can change proxy settings through the UI:
1. Click Settings (gear icon)
2. Go to "Proxy Settings" tab
3. Select preferred proxy (UV or Scramjet)
4. Select preferred transport (libcurl or epoxy)

### Environment Variables

The WISP URL can be changed in `src/store.ts`:
```typescript
wispUrl: "wss://wisp.mercurywork.shop/"
```

Or users can configure it through settings if you add a UI control for it.

## Files Modified

1. `public/sw.js` - Service worker routing logic
2. `public/uv/uv.config.js` - UV configuration
3. `src/components/hooks/useSw.tsx` - Service worker registration
4. `vite.config.ts` - Build configuration

## Deployment Notes

### Production Build

```bash
npm run build
npm start
```

The production build includes all necessary proxy files in the `dist/` folder.

### Vercel Deployment

Your `vercel.json` is already configured with the correct rewrites to support UV:

```json
{
  "rewrites": [
    {
      "source": "/((?!api|assets|scram|uv|baremux|libcurl|epoxy|logos|searchEngines|search|err|settings|sw.js|~|.*\\.).*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures proxy routes (`/uv/*`, `/baremux/*`, etc.) are not rewritten to index.html.

### Important: WISP Backend

This setup requires a WISP server to be running. Currently using the public Mercury Workshop WISP server:
- `wss://wisp.mercurywork.shop/`

For production, consider:
1. Using your own WISP server for better reliability
2. Having a fallback WISP server in case the primary is down
3. Monitoring WISP server health

## Troubleshooting

### Service Worker Not Loading

1. Check browser console for errors
2. Verify service worker is registered: `navigator.serviceWorker.getRegistrations()`
3. Clear service workers: Developer Tools → Application → Service Workers → Unregister
4. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Proxy Not Working

1. Check if WISP server is accessible: Open browser dev tools and look for WebSocket connections
2. Verify BareMux is loaded: Check console for `[baremux]` logs
3. Check proxy settings: Settings → Proxy Settings
4. Try switching between UV and Scramjet
5. Try switching between libcurl and epoxy transports

### Console Logs

Successful setup shows:
```
[sw] /sw.js successfully registered with a scope of /
[scramjet] Initialized successfully  (if available)
[baremux] Setting WISP URL to wss://wisp.mercurywork.shop/ using libcurl transport
```

## Development

### Running Locally

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

### Adding Custom WISP Server

1. Edit `src/store.ts`:
```typescript
wispUrl: "wss://your-wisp-server.com/"
```

2. Or add UI control for users to change it (like search engine settings)

## References

- [Ultraviolet GitHub](https://github.com/titaniumnetwork-dev/Ultraviolet)
- [Mercury Workshop (Scramjet, BareMux)](https://github.com/MercuryWorkshop)
- [WISP Protocol](https://github.com/MercuryWorkshop/wisp-protocol)
- [UV-Static-2.0 Reference](https://github.com/rhenryw/UV-Static-2.0)

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all proxy files are loaded (Network tab in dev tools)
3. Check service worker status in Application tab
4. Try different browsers (Chrome, Firefox, Edge)
5. Clear browser cache and service workers

---

**Status**: ✅ UV is fully configured and working!

Test it by:
1. Open `http://localhost:3000`
2. Choose browser or default mode
3. Enter a URL (e.g., `google.com`)
4. The proxy should load the website

Enjoy your working proxy! 🚀

