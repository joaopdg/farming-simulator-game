/**@type{HTMLCanvasElement} */

/* --- PLAYER AND BG CLASS --- */
class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites, inventory }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
    this.inventory = inventory;
    this.tools = ["hoe", "seeds", "water", "sickle"];
    this.toolsCooldown = 45;
    this.hand = this.tools[0];
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
    ctx.fillRect(this.position.x - 16, this.position.y - 20, 15, 15);

    ctx.fillStyle = "black";
    ctx.font = "bold 10px Helvetica";
    ctx.fillText("username", this.position.x, this.position.y - 12);

    if (this.toolsCooldown > 0) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y - 9, this.toolsCooldown, 4);
    }

    if (this.hand === this.tools[2]) {
      ctx.drawImage(
        wateringCan,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    } else if (this.hand === this.tools[1]) {
      ctx.drawImage(
        seedsImage,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
      ctx.font = "bold 7px Helvetica";
      ctx.fillStyle = "black";
      ctx.fillText(
        `${this.inventory.seeds.quantity}`,
        this.position.x - 15,
        this.position.y - 6
      );
    } else if (this.hand === this.tools[3]) {
      ctx.drawImage(
        emptyHand,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    } else if (this.hand === this.tools[0]) {
      ctx.drawImage(
        hoeImage,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    }
  }

  drawChest() {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      canvas.width / 2 - 110,
      canvas.height - canvas.height / 2 - 100,
      220,
      200
    );
    ctx.fillStyle = "white";
    ctx.font = "bold 10px Helvetica";
    ctx.fillText(
      `YOUR INVENTORY:`,
      canvas.width / 2 - 100,
      canvas.height - canvas.height / 2 - 80
    );
    ctx.fillText(
      `Seeds: ${this.inventory.seeds.quantity}`,
      canvas.width / 2 - 80,
      canvas.height - canvas.height / 2 - 50
    );
    ctx.fillText(
      `Harvest: ${this.inventory.harvest.quantity}`,
      canvas.width / 2 - 80,
      canvas.height - canvas.height / 2 - 35
    );
  }

  drawQuests() {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      canvas.width / 2 - 110,
      canvas.height - canvas.height / 2 - 100,
      220,
      200
    );
    ctx.fillStyle = "white";
    ctx.font = "bold 10px Helvetica";
    ctx.fillText(
      `YOUR QUESTS:`,
      canvas.width / 2 - 100,
      canvas.height - canvas.height / 2 - 80
    );
    ctx.fillText(
      `Plant 20 seeds ............... (0/20)`,
      canvas.width / 2 - 80,
      canvas.height - canvas.height / 2 - 50
    );
  }

  drawProfile() {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      canvas.width / 2 - 110,
      canvas.height - canvas.height / 2 - 100,
      220,
      200
    );
    ctx.fillStyle = "white";
    ctx.font = "bold 10px Helvetica";
    ctx.fillText(
      `WELCOME TO YOUR PROFILE:`,
      canvas.width / 2 - 100,
      canvas.height - canvas.height / 2 - 80
    );
  }
}
