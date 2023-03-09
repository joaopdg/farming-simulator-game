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

//cache game files
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

//get game files when offline
self.addEventListener("fetch", function (event) {
  /* console.log("Fetch event for ", event.request.url) */
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          /* console.log("Found ", event.request.url, " in cache") */
          return response;
        }
        /* console.log("Network request for ", event.request.url) */
        return fetch(event.request);
      })
      .catch(function (error) {
        return caches.match("index.html");
      })
  );
});
