# Recent Changes Summary

## ✅ Completed

### 1. **Removed Scramjet** - UV Only Now
- Removed all Scramjet code and references
- Simplified service worker to only handle UV routes
- Updated UI to show "Ultraviolet (UV)" as the only proxy
- Removed proxy switching options from settings
- Cleaned up index.html (removed Scramjet scripts)

### 2. **Update Popup Timer** - 7 Second Button Disable
- Button is now **disabled for 7 seconds** 
- Forces users to read the update message
- Countdown timer shows: "Please read... X seconds"
- Button text changes: "Wait Xs" → "Got it!"
- Popup can stay open longer - user closes it manually after 7s

## 🔧 Current Configuration

**Service Worker** (`public/sw.js`):
```javascript
// UV Only - No Scramjet
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');

const uv = new UVServiceWorker();

// Only handles /~/uv/* routes
```

**Proxy Settings:**
- Proxy: `uv` (fixed, no longer switchable)
- Transport: libcurl or epoxy (still switchable)
- WISP Server: `wss://wisp.mercurywork.shop/`

## 📝 How UV Works

1. User enters URL (e.g., `google.com`)
2. App creates proxy path: `/~/uv/ENCODED_URL`
3. Service worker intercepts request starting with `/~/uv/`
4. UV decodes and proxies the request through WISP
5. Page loads in iframe

## 🧪 Testing UV

**To test if UV is working:**

1. Open http://localhost:3000 (server is running)
2. Select Browser Mode or Default Mode  
3. Enter a URL like `google.com`
4. Check browser console for:
   ```
   [sw] /sw.js successfully registered
   [uv] Setting WISP URL to wss://wisp.mercurywork.shop/
   ```

5. Check Network tab:
   - Should see requests to `/~/uv/...`
   - Should see WebSocket connection to WISP server

**If UV isn't working, check:**
- Browser console for errors
- Service worker is registered (DevTools → Application → Service Workers)
- UV bundle loaded: http://localhost:3000/uv/uv.bundle.js
- BareMux worker loaded: http://localhost:3000/baremux/worker.js

## 🐛 Troubleshooting

If proxy doesn't load websites:

1. **Clear Service Workers:**
   ```javascript
   // In browser console:
   navigator.serviceWorker.getRegistrations().then(regs => {
     regs.forEach(reg => reg.unregister());
   });
   // Then hard refresh (Ctrl+Shift+R)
   ```

2. **Check WISP Connection:**
   - Open Network tab
   - Look for WebSocket connection to `wisp.mercurywork.shop`
   - Should show "Status: 101 Switching Protocols"

3. **Verify Files:**
   ```bash
   curl http://localhost:3000/sw.js | head
   curl http://localhost:3000/uv/uv.config.js
   curl -I http://localhost:3000/uv/uv.bundle.js
   curl -I http://localhost:3000/baremux/worker.js
   ```

4. **Check iframe src:**
   - Open DevTools Elements tab
   - Find the iframe element
   - Src should be like: `/~/uv/https%3A%2F%2Fgoogle.com`

## 📦 Files Changed

1. `public/sw.js` - Removed Scramjet, UV only
2. `public/uv/uv.config.js` - Already configured
3. `src/components/hooks/useSw.tsx` - Removed Scramjet init
4. `src/store.ts` - Changed proxy type to `"uv"` only
5. `src/routes/index.tsx` - Added 7s button disable timer
6. `src/components/homeComponents/default.tsx` - Removed Scramjet option
7. `src/components/homeComponents/tabbed.tsx` - Removed Scramjet option  
8. `index.html` - Removed Scramjet scripts

## 🚀 Server Status

Server is running on: **http://localhost:3000**

Test it by opening that URL in your browser!

## 📚 Next Steps

1. Test UV in browser (see testing section above)
2. If it works: Deploy to production
3. If not: Check troubleshooting steps and browser console for specific errors

Let me know what error message you see and I can help debug!

