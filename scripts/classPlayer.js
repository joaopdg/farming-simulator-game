/**@type{HTMLCanvasElement} */

/* --- PLAYER AND BG CLASS --- */
class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites, inventory }) {
    this.position = position;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image = image;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };

    this.moving = false;
    this.sprites = sprites;

    this.inventory = inventory;

    this.toolsCooldown = 45;
    this.tools = [
      {
        name: "hoe",
        image: hoeImg,
        quantity: 1,
      },
      {
        name: "seeds",
        image: seedsImg,
        quantity: 5,
      },
      {
        name: "water",
        image: waterImg,
        quantity: 1,
      },
      {
        name: "sickle",
        image: sickleImg,
        quantity: 1,
      },
    ];
    this.hand = this.tools[0].name;
  }

  draw() {
    ctx.drawImage(
      this.image,
      //cropping sprite sheet x, y, w, h
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      //starting point to draw image
      this.position.x,
      this.position.y,
      //width and height of image
      this.image.width / this.frames.max,
      this.image.height
    );

    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) {
        this.frames.val++;
      } else {
        this.frames.val = 0;
      }
    }
  }

  drawHand() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x - 21, this.position.y - 20, 15, 15);

    ctx.fillStyle = "black";
    ctx.font = "bold 10px Helvetica";
    ctx.fillText("username", this.position.x - 5, this.position.y - 12);

    //tool cooldown
    if (this.toolsCooldown > 0) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        this.position.x - 5,
        this.position.y - 9,
        this.toolsCooldown,
        4
      );
    }

    //tool cycle
    this.tools.map((tool) => {
      if (this.hand === tool.name) {
        ctx.drawImage(
          tool.image,
          this.position.x - 20,
          this.position.y - 20,
          14,
          14
        );
        ctx.font = "bold 7px Helvetica";
        ctx.fillStyle = "black";
        ctx.fillText(
          `${tool.quantity}`,
          this.position.x - 22,
          this.position.y - 5
        );
      }
    });
  }
}
