/**@type{HTMLCanvasElement} */

/* --- SCREENS CLASS --- */
class Screen {
  constructor({ image, content }) {
    this.x = canvas.width / 2 - 110;
    this.y = canvas.height - canvas.height / 2 - 100;
    this.width = 220;
    this.height = 200;
    this.image = image;
    this.content = content;
  }

  draw() {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.x - 15,
        this.y,
        this.width + 30,
        this.height
      );
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    ctx.fillStyle = "black";
    ctx.font = "bold 10px Helvetica";

    this.content.map((el, i) => {
      if (!el.completed || !el.reward) {
        ctx.fillText(
          `${el.desc}`,
          canvas.width / 2 - 100,
          canvas.height - canvas.height / 2 - 70 + i * 30
        );
        ctx.fillText(
          `${el.count} / ${el.goal}`,
          canvas.width / 2 - 35,
          canvas.height - canvas.height / 2 - 70 + i * 30 + 10
        );
      }
    });
  }
}
