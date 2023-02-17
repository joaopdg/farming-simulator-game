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

/* --- CULTIVATED TIME --- */
const stageOneTime = 3000; //10000
const stageTwoTime = 6000; //20000

/* --- PLOWED LAND BLOCK IMAGE --- */
const plowedLand = new Image();
plowedLand.src = "../assets/sprites/plowedLand.png";

/* --- CULTIVATED BLOCK IMAGE --- */
const resetBlock = new Image();
resetBlock.src = "../assets/sprites/resetBlock.png";
const cultivedImg = new Image();
cultivedImg.src = "../assets/sprites/cultivated.png";
const cultivedImg2 = new Image();
cultivedImg2.src = "../assets/sprites/cultivated2.png";
const cultivedImg3 = new Image();
cultivedImg3.src = "../assets/sprites/cultivated3.png";

/* --- MAP IMAGE --- */
const mapImage = new Image();
mapImage.src = "../assets/map/farming_io_map.png";

/* --- MAP OFFSET --- */
let offset = {
  x: -1120,
  /* y: -480, */
  y: -580,
};

/* --- CREATE BACKGROUND --- */
let background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImage,
});

/* --- CREATE PLAYER --- */
let player = new Sprite({
  position: {
    x: canvas.width / 2 - 198 / 4 / 2,
    /* y: canvas.height / 2 + 68 / 2 + 20, */
    y: canvas.height / 2 - 50,
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
    seeds: {
      wheat: 5,
    },
    harvest: {
      wheat: 0,
    },
  },
});

