/**@type{HTMLCanvasElement} */

class Screen {
  constructor({ image, content }) {
    this.x = canvas.width / 2 - 110;
    this.y = canvas.height - canvas.height / 2 - 100;
    this.width = 220;
    this.heigth = 200;
    this.image = image;
    this.content = content;
  }

  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.heigth);

    ctx.fillStyle = "white";
    ctx.font = "bold 10px Helvetica";
    ctx.fillText(
      `${this.content}`,
      canvas.width / 2 - 100,
      canvas.height - canvas.height / 2 - 80
    );
  }
}
