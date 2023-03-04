/**@type{HTMLCanvasElement} */

/* --- GUI CLASS --- */
class Gui {
  constructor({ x, y, width, height, image }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clicked = false;
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
