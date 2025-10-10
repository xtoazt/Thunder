// Service Worker for Thundr - Routes UV and Scramjet
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/scram/scramjet.shared.js');
importScripts('/scram/scramjet.worker.js');

const uv = new UVServiceWorker();
const scramjet = new ScramjetServiceWorker();

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
  } else if (event.request.url.startsWith(location.origin + '/~/scramjet/')) {
    event.respondWith(scramjet.fetch(event));
  }
});

