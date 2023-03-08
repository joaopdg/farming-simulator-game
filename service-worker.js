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

/* importScripts(
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
}); */

const cacheName = "farmingio_v2";

const precachedAssets = [
  "/style.css",
  "/scripts/game.js",
  "/scripts/gameAreas.js",
  "/scripts/gameSave.js",
  "/scripts/gui.js",
  "/scripts/player.js",
  "/scripts/quests.js",
  "/scripts/variables.js",
  "/scripts/worldMap.js",
  "/scripts/controls/joystick.js",
  "/scripts/controls/controls.js",
  "/assets/images/iconBook.png",
  "/assets/images/iconChest.png",
  "/assets/images/iconPrizes.png",
  "/assets/images/iconProfile.png",
  "/assets/images/openedBook.png",
  "/assets/map/collisions.js",
  "/assets/map/collisionsArray.js",
  "/assets/map/farming_io_map.png",
  "/assets/map/gardenArray.js",
  "/assets/sprites/cultivated.png",
  "/assets/sprites/cultivated2.png",
  "/assets/sprites/cultivated3.png",
  "/assets/sprites/playerDown.png",
  "/assets/sprites/playerLeft.png",
  "/assets/sprites/playerRight.png",
  "/assets/sprites/playerUp.png",
  "/assets/sprites/hoeImg.png",
  "/assets/sprites/plowedLand.png",
  "/assets/sprites/resetBlock.png",
  "/assets/sprites/seedsImg.png",
  "/assets/sprites/sickleImg.png",
  "/assets/sprites/waterImg.png",
];

/* self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precachedAssets);
    })
  );
}); */

self.addEventListener("install", function (event) {
  caches.open("farming_io").then(function (cache) {
    cache.addAll(precachedAssets);
  });
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.open("farming_io").then((cache) => {
        return fetch(event.request.url)
          .then((fetchedResponse) => {
            cache.put(event.request, fetchedResponse.clone());

            return fetchedResponse;
          })
          .catch(() => {
            return cache.match(event.request.url);
          });
      })
    );
  }
});
