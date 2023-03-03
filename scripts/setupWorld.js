/**@type{HTMLCanvasElement} */

/* --- CANVAS SETUP --- */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

/* --- MAP OFFSET --- x:-1120 y:-580*/
let offset = {
  x: -305,
  y: -170,
};

/* --- CULTIVATED TIME --- */
const stageOneTime = 3000; //10000
const stageTwoTime = 6000; //20000

/* --- MAP IMAGE --- */
const mapImage = new Image();
mapImage.src = "../assets/map/farming_io_map.png";

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

/* --- CREATE BACKGROUND --- */
let background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImage,
});






