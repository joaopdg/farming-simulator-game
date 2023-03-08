/* importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.NetworkFirst()
);

self.addEventListener("install", function (event) {
  caches.open("PRECACHE").then(function (cache) {
    cache.addAll(cacheList);
  });
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.NetworkFirst()
);

const KEY = "key";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("message", (event) => {
  if (event.data.type === "CACHE_URLS") {
    event.waitUntil(
      caches.open(KEY).then((cache) => {
        return cache.addAll(event.data.payload);
      })
    );
  }
});
