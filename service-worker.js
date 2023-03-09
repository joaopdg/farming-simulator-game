let coreAssets = [
  "/style.css",
  "/assets/map/farming_io_map.png",
  "/assets/images/iconBook.png",
  "/assets/images/iconChest.png",
  "/assets/images/iconPrizes.png",
  "/assets/images/iconProfile.png",
  "/assets/images/openedBook.png",
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
  "/scripts/variables.js",
  "/assets/map/collisionsArray.js",
  "/assets/map/gardenArray.js",
  "/scripts/gameAreas.js",
  "/scripts/worldMap.js",
  "/scripts/player.js",
  "/scripts/quests.js",
  "/scripts/gui.js",
  "/assets/map/collisions.js",
  "/scripts/controls/joystick.js",
  "/scripts/controls/controls.js",
  "/scripts/gameSave.js",
  "/scripts/game.js",
  "/index.html",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("app").then(function (cache) {
      for (let asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request);
      })
      .catch(function (error) {
        return caches.match("index.html");
      })
  );
});

/* self.addEventListener("fetch", function (event) {
  let request = event.request;
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // HTML files
  // Network-first
  if (request.headers.get("Accept").includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          let copy = response.clone();
          event.waitUntil(
            caches.open("app").then(function (cache) {
              return cache.put(request, copy);
            })
          );
          return response;
        })
        .catch(function (error) {
          return caches.match(request).then(function (response) {
            return response || caches.match("/offline.html");
          });
        })
    );
  }

  // CSS & JavaScript
  // Offline-first
  if (
    request.headers.get("Accept").includes("text/css") ||
    request.headers.get("Accept").includes("text/javascript")
  ) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            return response;
          })
        );
      })
    );
    return;
  }

  // Images
  // Offline-first
  if (request.headers.get("Accept").includes("image")) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            let copy = response.clone();
            event.waitUntil(
              caches.open("app").then(function (cache) {
                return cache.put(request, copy);
              })
            );
            return response;
          })
        );
      })
    );
  }
}); */

/* ---------------------------------------------------------------- */

/* // On install, cache core assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("app").then(function (cache) {
      for (let asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    })
  );
});

// Listen for request events
self.addEventListener("fetch", function (event) {
  let request = event.request;
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // HTML files
  // Network-first
  if (
    request.headers.get("Accept").includes("text/html") ||
    request.headers.get("Accept").includes("text/css") ||
    request.headers.get("Accept").includes("text/javascript") ||
    request.headers.get("Accept").includes("image")
  ) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          // Create a copy of the response and save it to the cache
          let copy = response.clone();

          caches.open("app").then(function (cache) {
            return cache.put(request, copy);
          });

          // Return the response
          return response;
        })
        .catch(function (error) {
          // If there's no item in cache, respond with a fallback
          return caches.match(request).then(function (response) {
            return response || caches.match("/offline.html");
          });
        })
    );
  }

  // CSS & JavaScript
  // Offline-first
  if (
    request.headers.get("Accept").includes("text/css") ||
    request.headers.get("Accept").includes("text/javascript")
  ) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            // Return the response
            return response;
          })
        );
      })
    );
    return;
  }

  // Images
  // Offline-first
  if (request.headers.get("Accept").includes("image")) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return (
          response ||
          fetch(request).then(function (response) {
            // Save a copy of it in cache
            let copy = response.clone();
            event.waitUntil(
              caches.open("app").then(function (cache) {
                return cache.put(request, copy);
              })
            );

            // Return the response
            return response;
          })
        );
      })
    );
  }
});
 */
