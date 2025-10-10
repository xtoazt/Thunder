// Service Worker for Thundr - UV Only
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');

const uv = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/~/service/')) {
    event.respondWith(
      (async () => {
        try {
          return await uv.fetch(event);
        } catch (e) {
          console.error('[UV] Fetch error:', e);
          return new Response('UV Proxy Error', { status: 500 });
        }
      })()
    );
  }
});

