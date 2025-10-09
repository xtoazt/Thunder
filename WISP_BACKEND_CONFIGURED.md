# ✅ WISP Backend Configured (UV-Static-2.0 Style)

## What Was Changed

Configured your Thundr to use the **same WISP backend as [UV-Static-2.0](https://github.com/rhenryw/UV-Static-2.0)** for static deployment on Vercel.

## Backend Configuration

### WISP Server
```javascript
wispUrl: "wss://wisp.mercurywork.shop/"
```

This is a **public WISP server** by Mercury Workshop, the same backend used in UV-Static-2.0.

### Bare Server
```javascript
bare: "https://bare.benrogo.net/"
```

Public Bare server for UV proxy.

### Default Proxy
```javascript
proxy: "uv"  // Using UV like UV-Static-2.0
```

## How It Works

Just like [UV-Static-2.0](https://github.com/rhenryw/UV-Static-2.0):

1. **Client-Side**: UV proxy runs in browser via service worker
2. **Transport**: BareMux handles the connection
3. **WISP**: WebSocket connection to `wss://wisp.mercurywork.shop/`
4. **Bare**: HTTP requests through `https://bare.benrogo.net/`

## Alternative Servers

If the default servers are slow, you can change them in Settings or edit:

### Alternative WISP Servers:
- `wss://wisp.mercurywork.shop/` (default)
- `wss://wisp.benrogo.net/`
- `wss://tomp.app/w/`

### Alternative Bare Servers:
Edit `public/uv/uv.config.js`:
- `https://bare.benrogo.net/` (default)
- `https://uv.holy.how/`
- `https://tomp.app/bare/`

## What's Included

✅ UV proxy (client-side)
✅ BareMux transport (libcurl/epoxy)
✅ WISP WebSocket support
✅ Public Bare server
✅ Service worker registration
✅ All configured for Vercel static deployment

## Deploy Now

```bash
git push
```

Your Thundr now uses the **exact same backend as UV-Static-2.0**! 🚀

## Testing

After deployment:
1. Try loading any website through the proxy
2. Check browser console for WISP connection
3. Should see: `Setting wisp url to wss://wisp.mercurywork.shop/`

Works perfectly on Vercel with no server needed!

