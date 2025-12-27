/* =====================================
   SERVICE WORKER
   POS SYSTEM – COMMERCIAL VERSION
   Auto Update + Cache Control
===================================== */

const CACHE_NAME = "pos-system-v3";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./core.js",
  "./reports.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

/* ===== INSTALL ===== */
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

/* ===== ACTIVATE ===== */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* ===== FETCH ===== */
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
