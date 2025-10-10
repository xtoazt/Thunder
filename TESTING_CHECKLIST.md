# UV Proxy Testing Checklist ✅

## Quick Start

Your server is running at: **http://localhost:3000**

## Pre-Test Verification

Run these checks to ensure everything is in place:

```bash
# 1. Check if server is running
curl -I http://localhost:3000

# 2. Verify UV config
curl http://localhost:3000/uv/uv.config.js

# 3. Verify service worker
curl http://localhost:3000/sw.js

# 4. Check all proxy files exist
curl -I http://localhost:3000/uv/uv.bundle.js
curl -I http://localhost:3000/baremux/worker.js
curl -I http://localhost:3000/scram/scramjet.worker.js
```

All should return `200 OK` ✅

## Browser Testing

### Test 1: Browser Mode with UV

1. ✅ Open http://localhost:3000
2. ✅ Select **"Browser Mode"** on onboarding
3. ✅ Enter a URL in the address bar: `google.com`
4. ✅ Press Enter
5. ✅ Google should load in the iframe
6. ✅ Try navigating to other sites
7. ✅ Check console for errors (should show service worker registered)

**Expected Console Output:**
```
[sw] /sw.js successfully registered with a scope of /
[baremux] Setting WISP URL to wss://wisp.mercurywork.shop/ using libcurl transport
```

### Test 2: Default Mode with UV

1. ✅ Clear browser cache and reload
2. ✅ Select **"Default Mode"** on onboarding
3. ✅ Enter a URL in search box: `github.com`
4. ✅ GitHub should load
5. ✅ Try clicking links
6. ✅ Use back/forward buttons

### Test 3: Switching Proxies

1. ✅ Click Settings (gear icon)
2. ✅ Go to "Proxy Settings" tab
3. ✅ Switch to **Scramjet**
4. ✅ Close settings
5. ✅ Try loading a website
6. ✅ Switch back to **Ultraviolet**
7. ✅ Try loading a website

### Test 4: Switching Transports

1. ✅ Open Settings → Proxy Settings
2. ✅ Switch transport to **Epoxy**
3. ✅ Try loading a website
4. ✅ Switch back to **Libcurl**
5. ✅ Try loading a website

### Test 5: Tab Management (Browser Mode)

1. ✅ Open new tab (+ button)
2. ✅ Load different sites in different tabs
3. ✅ Switch between tabs
4. ✅ Close tabs
5. ✅ Reorder tabs (if enabled in settings)

## Browser Console Checks

### Expected Logs (No Errors)

```
✅ [sw] /sw.js successfully registered with a scope of /
✅ [baremux] Setting WISP URL to wss://wisp.mercurywork.shop/ using libcurl transport
✅ [scramjet] Initialized successfully (if available)
```

### Check Service Worker Status

In browser DevTools:
1. Open Application tab
2. Click Service Workers
3. Should see: `http://localhost:3000/sw.js` - **ACTIVATED**

### Check Network Requests

In browser DevTools:
1. Open Network tab
2. Load a website through proxy
3. Should see requests to `/~/uv/` or `/~/scramjet/`
4. Should see WebSocket connection to WISP server

## Common Issues & Solutions

### ❌ Issue: Service Worker Not Registering

**Solution:**
```javascript
// In browser console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});
// Then hard refresh (Ctrl+Shift+R)
```

### ❌ Issue: Proxy Not Loading

**Check:**
1. Is WISP server reachable?
2. Are proxy files loaded in Network tab?
3. Any console errors?
4. Try different proxy (UV ↔ Scramjet)

### ❌ Issue: CORS Errors

This is expected! The proxy should handle CORS.
- If you see CORS errors with proxy paths, check service worker
- If you see CORS errors without proxy paths, proxy isn't routing

### ❌ Issue: Blank Screen

1. Check console for errors
2. Check Network tab for 404s
3. Verify all assets loaded
4. Try clearing cache and hard refresh

## Performance Testing

### Load Time Test

```bash
# Time a proxy request
time curl -s http://localhost:3000/~/uv/$(echo -n "https://google.com" | xxd -p | tr -d '\n')
```

### Concurrent Requests

Open multiple tabs and load different sites simultaneously.

## Browser Compatibility

Test in multiple browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Edge
- ✅ Safari (may have service worker limitations)

## Mobile Testing

If testing on mobile:
1. Use `http://YOUR_LOCAL_IP:3000`
2. Ensure firewall allows connections
3. Test touch gestures in browser mode

## Production Testing

```bash
# Build and test production
npm run build
npm start

# Should work exactly the same
```

## Security Checks

1. ✅ Check that original URLs are obfuscated
2. ✅ Verify XOR encoding is working (check proxy URLs)
3. ✅ Test HTTPS sites work correctly
4. ✅ Check for any credential leaks in console

## Success Criteria

Your UV setup is working if:
- ✅ Service worker registers without errors
- ✅ Websites load through `/~/uv/` prefix
- ✅ Can navigate between pages
- ✅ Can switch between UV and Scramjet
- ✅ Console shows proper initialization logs
- ✅ No 404 errors for proxy files
- ✅ WISP WebSocket connection established

## Next Steps

Once everything passes:
1. Push to GitHub
2. Deploy to production (Vercel/Render/etc.)
3. Test on production URL
4. Share with users!

## Debugging Commands

```bash
# Check running processes
lsof -i :3000

# View server logs
# (Check terminal where npm start is running)

# Rebuild if needed
npm run build

# Clear node modules and reinstall (if really broken)
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

**Ready to test?** Just open http://localhost:3000 in your browser! 🚀

The server is already running in the background.

