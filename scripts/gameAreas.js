/**@type{HTMLCanvasElement} */

/* --- BOUNDARY CLASS --- */
class Boundary {
  static width = pixelRatio;
  static height = pixelRatio;
  constructor({ position }) {
    this.position = position;
    this.width = pixelRatio;
    this.height = pixelRatio;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 0, 0, ${oppacity})`;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

/* --- GARDEN CLASS --- */
class Garden {
  static width = pixelRatio;
  static height = pixelRatio;
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
    this.width = pixelRatio;
    this.height = pixelRatio;
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
