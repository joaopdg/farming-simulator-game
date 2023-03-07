/**@type{HTMLCanvasElement} */

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

/* --- WORLD MAP CLASS --- */
class worldMap {
  constructor() {
    this.image = mapImage;
    this.width = this.image.width;
    this.height = this.image.height;
    this.position = {
      x: -1680 / 2 + window.innerWidth / 2,
      y: -960 / 2 + window.innerHeight / 2,
    };
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
  }
}

/* --- CREATE BACKGROUND --- */
let background = new worldMap();

/* --- MAP OFFSET --- x:-637 y:-60 --- */
let offset = {
  x: -background.image.width / 2 + window.innerWidth / 2,
  y: -background.image.height / 2 + window.innerHeight / 2,
};
