// Service Worker for Thundr - UV Only
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');

const uv = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(location.origin + '/~/uv/')) {
    event.respondWith(
      (async () => {
        if (await uv.route(event)) {
          return await uv.fetch(event);
        }
        return await fetch(event.request);
      })()
    );
  }
});

