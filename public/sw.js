// Service Worker for Thundr - UV Only
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');

const uv = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  if (uv.route(event)) {
    event.respondWith(uv.fetch(event));
  }
});

