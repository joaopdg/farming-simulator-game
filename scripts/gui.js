/**@type{HTMLCanvasElement} */

/* --- BUTTONS IMAGE --- */
const iconBook = new Image();
iconBook.src = "../assets/images/iconBook.png";
const iconChest = new Image();
iconChest.src = "../assets/images/iconChest.png";
const iconPrizes = new Image();
iconPrizes.src = "../assets/images/iconPrizes.png";
const iconProfile = new Image();
iconProfile.src = "../assets/images/iconProfile.png";
const openedBook = new Image();
openedBook.src = "../assets/images/openedBook.png";

/* --- GUI CLASS --- */
class Gui {
  constructor({ iconPos, icon, screen, content, type }) {
    this.clicked = false;
    this.icon = icon;
    this.screen = screen;
    this.content = content;
    this.type = type;
    this.iconPos = {
      x: iconPos.x,
      y: iconPos.y,
      width: 40,
      height: 40,
    };
    this.screenPos = {
      x: canvas.width / 2 - 175,
      y: canvas.height / 2 - 150,
      width: 350,
      height: 300,
    };
    this.closeButton = {
      x: canvas.width / 2 + 130,
      y: canvas.height / 2 - 150,
      width: 30,
      height: 30,
    };
  }

  draw() {
    //draw icon
    ctx.drawImage(
      this.icon,
      this.iconPos.x,
      this.iconPos.y,
      this.iconPos.width,
      this.iconPos.height
    );

    //draw screen (icon oppened)
    if (this.clicked) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        this.screen,
        this.screenPos.x,
        this.screenPos.y,
        this.screenPos.width,
        this.screenPos.height
      );
      //draw close button for opened screen
      ctx.fillRect(
        this.closeButton.x,
        this.closeButton.y,
        this.closeButton.width,
        this.closeButton.height
      );

      if (this.type === "questBook") {
        this.content.map((el, i) => {
          //draw quest border and glow if completed
          if (!el.reward) {
            let elX = canvas.width / 2 - 150;
            let elY = canvas.height - canvas.height / 2 - 110 + i * 40;
            let elW = 300;
            let elH = 30;
            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            if (el.completed) {
              ctx.strokeStyle = "rgba(255,255,255,0.8)";
              ctx.fillStyle = "rgba(255,255,255,0.8)";
            }
            ctx.beginPath();
            ctx.roundRect(elX, elY, elW, elH, 5);
            ctx.fill();
            ctx.stroke();

            //listen for click on completed quest
            if (el.completed) {
              if (
                click.x >= elX &&
                click.x <= elX + elW &&
                click.y >= elY &&
                click.y <= elY + elH
              ) {
                el.reward = true;
              }
            }
          }

          //draw quest text
          if (!el.completed || !el.reward) {
            ctx.font = "bold 18px arial";
            ctx.fillStyle = "black";
            ctx.fillText(
              `${el.desc}`,
              canvas.width / 2 - 140,
              canvas.height - canvas.height / 2 - 90 + i * 40
            );
            ctx.fillText(
              `${el.count} / ${el.goal}`,
              canvas.width / 2 + 90,
              canvas.height - canvas.height / 2 - 90 + i * 40
            );
          }
        });
      }
    }
  }
}

/* --- CREATING BUTTONS --- */
const gameButtons = [
  new Gui({
    iconPos: {
      x: 10,
      y: 10,
    },
    icon: iconProfile,
    screen: openedBook,
    type: "profile",
  }),
  new Gui({
    iconPos: {
      x: 10,
      y: 10 * 6.5,
    },
    icon: iconBook,
    screen: openedBook,
    content: quests,
    type: "questBook",
  }),
  new Gui({
    iconPos: {
      x: 10,
      y: 10 * 12.5,
    },
    icon: iconChest,
    screen: openedBook,
    type: "inventory",
  }),
  new Gui({
    iconPos: {
      x: 10 * 6,
      y: 10,
    },
    icon: iconPrizes,
    screen: openedBook,
    type: "prizes",
  }),
];

/* --- CHECK IF CLICK COLLIDES WITH BUTTON --- */
const clickCollision = (click) => {
  gameButtons.map((button) => {
    if (!button.clicked) {
      if (
        click.x >= button.iconPos.x &&
        click.x <= button.iconPos.x + button.iconPos.width &&
        click.y >= button.iconPos.y &&
        click.y <= button.iconPos.y + button.iconPos.height
      ) {
        button.clicked = true;
        screenOnTop = true;
      }
    } else if (button.clicked) {
      if (
        click.x >= button.closeButton.x &&
        click.x <= button.closeButton.x + button.closeButton.width &&
        click.y >= button.closeButton.y &&
        click.y <= button.closeButton.y + button.closeButton.height
      ) {
        button.clicked = false;
        screenOnTop = false;
      }
    }
  });
};

/* --- CHECK WHERE USER CLICKED --- */
const getCoords = (event) => {
  const container = canvas.getBoundingClientRect();
  const x = event.clientX - container.left / 2;
  const y = event.clientY - container.top / 2;

  click = {
    x: x,
    y: y /* - 50 */,
  };

  return click;
};

const funcRunner = (e) => {
  getCoords(e);
  clickCollision(click);
};

canvas.addEventListener("click", funcRunner);
