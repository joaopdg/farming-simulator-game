/**@type{HTMLCanvasElement} */

/* --- CANVAS SETUP --- */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

/* --- PLAYER IMAGES --- */
const playerUp = new Image();
playerUp.src = "../assets/sprites/playerUp.png";
const playerDown = new Image();
playerDown.src = "../assets/sprites/playerDown.png";
const playerLeft = new Image();
playerLeft.src = "../assets/sprites/playerLeft.png";
const playerRight = new Image();
playerRight.src = "../assets/sprites/playerRight.png";

/* --- CULTIVATED BLOCK IMAGE --- */
const cultivedImg = new Image();
cultivedImg.src = "./assets/sprites/cultivated.png";

/* --- MAP IMAGE --- */
const mapImage = new Image();
mapImage.src = "./assets/map/farming_io_map.png";

/* --- MAP OFFSET --- */
const offset = {
  x: -1120,
  y: -480,
};

/* --- CREATE BACKGROUND --- */
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImage,
});

/* --- CREATE PLAYER --- */
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 198 / 4 / 2,
    y: canvas.height / 2 + 68 / 2 + 20,
  },
  image: playerDown,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUp,
    down: playerDown,
    left: playerLeft,
    right: playerRight,
  },
  inventory: {
    wateringCan: 5,
    seeds: {
      wheat: 5,
    },
  },
});
