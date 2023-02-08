/**@type{HTMLCanvasElement} */

const oppacity = 0.0;

/* --- SPRITE CLASS --- */
class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1 },
    sprites,
    inventory,
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
    /* --- */
    this.inventory = inventory;
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
}

/* --- BOUNDARY CLASS --- */
class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 0, 0, ${oppacity})`;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

/* --- GARDEN CLASS --- */
class Garden {
  static width = 48;
  static height = 48;
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
    this.width = 48;
    this.height = 48;
    this.cultivated = false;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 0, 255, ${oppacity})`;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  plant() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  harvest() {}
}
