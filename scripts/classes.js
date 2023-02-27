/**@type{HTMLCanvasElement} */

const oppacity = 0.0;

/* --- SPRITE CLASS --- */
class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites, inventory }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      if (this.image === mapImage) {
        document.getElementById("spinner").classList.add("hidden");
        /*  setTimeout(() => {
          document.getElementById("spinner").classList.add("hidden");
        }, 1000); */
      }
    };
    this.moving = false;
    this.sprites = sprites;
    this.inventory = inventory;
    this.tools = ["hoe", "seeds", "water", "sickle"];
    this.toolsCooldown = 45;
    this.hand = this.tools[0];
  }

  drawInventory() {
    ctx.fillStyle = "black";
    ctx.font = "10px Helvetica";
    ctx.fillText(`Seeds: ${this.inventory.seeds.wheat}`, 390, 45);
    ctx.fillText(`Harvest: ${this.inventory.harvest.wheat}`, 390, 60);

    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x - 16, this.position.y - 20, 15, 15);

    ctx.fillStyle = "black";
    ctx.fillText("username", this.position.x, this.position.y - 12);

    if (this.toolsCooldown > 0) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y - 9, this.toolsCooldown, 4);
    }

    if (this.hand === player.tools[2]) {
      ctx.drawImage(
        wateringCan,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    } else if (this.hand === player.tools[1]) {
      ctx.drawImage(
        seedsImage,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    } else if (this.hand === player.tools[3]) {
      ctx.drawImage(
        emptyHand,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    } else if (this.hand === player.tools[0]) {
      ctx.drawImage(
        hoeImage,
        this.position.x - 15,
        this.position.y - 20,
        14,
        14
      );
    }
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
  static width = 24;
  static height = 24;
  constructor({ position }) {
    this.position = position;
    this.width = 24;
    this.height = 24;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 0, 0, ${oppacity})`;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

/* --- GARDEN CLASS --- */
class Garden {
  static width = 24;
  static height = 24;
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
    this.width = 24;
    this.height = 24;
    this.landPlowed = false;
    this.cultivated = false;
    this.currentTime = null;
    this.growTime = null;
    this.growStage = 1;
    this.harvestReady = false;
    this.watered = false;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 0, 255, ${oppacity})`;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  plant() {
    if (this.landPlowed && !this.cultivated && !this.imageChanged) {
      this.image = plowedLand;
    } else if (this.growStage === 1) {
      this.image = cultivedImg;
    } else if (this.growStage === 2) {
      this.image = cultivedImg2;
    } else if (this.growStage === 3) {
      this.image = cultivedImg3;
    }
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  grow() {
    this.currentTime = Date.now();
    if (this.cultivated && this.growTime === null && this.watered) {
      this.growTime = Date.now();
    }
    if (
      this.watered &&
      this.cultivated &&
      this.growStage === 1 &&
      this.currentTime > this.growTime + stageOneTime
    ) {
      this.growStage = 2;
    }
    if (
      this.watered &&
      this.cultivated &&
      this.growStage === 2 &&
      this.currentTime > this.growTime + stageTwoTime
    ) {
      this.growStage = 3;
    }
  }

  harvest() {
    if (this.cultivated && this.growStage === 3) {
      this.harvestReady = true;
    }
  }
}
