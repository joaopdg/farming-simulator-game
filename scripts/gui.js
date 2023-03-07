/**@type{HTMLCanvasElement} */

/* --- BUTTONS IMAGE --- */
const iconBook = new Image();
iconBook.src = "../assets/images/iconBook.png";
const openedBook = new Image();
openedBook.src = "../assets/images/openedBook.png";

/* --- GUI CLASS --- */
class Gui {
  constructor({ iconPos, icon, screen, content }) {
    this.clicked = false;
    this.icon = icon;
    this.screen = screen;
    this.content = content;
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
    ctx.drawImage(
      this.icon,
      this.iconPos.x,
      this.iconPos.y,
      this.iconPos.width,
      this.iconPos.height
    );

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
      ctx.fillRect(
        this.closeButton.x,
        this.closeButton.y,
        this.closeButton.width,
        this.closeButton.height
      );

      if (this.content) {
        this.content.map((el, i) => {
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

const gameButtons = [
  new Gui({
    iconPos: {
      x: 10,
      y: 20,
    },
    icon: iconBook,
    screen: openedBook,
    content: quests,
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
      }
    } else if (button.clicked) {
      if (
        click.x >= button.closeButton.x &&
        click.x <= button.closeButton.x + button.closeButton.width &&
        click.y >= button.closeButton.y &&
        click.y <= button.closeButton.y + button.closeButton.height
      ) {
        button.clicked = false;
      }
    }
  });
};

/* --- CHECK WHERE USER CLICKED --- */
const getCoords = (event) => {
  const container = canvas.getBoundingClientRect();
  const x = event.clientX - container.left / 2;
  const y = event.clientY - container.top / 2;

  const click = {
    x: x,
    y: y,
  };

  return clickCollision(click);
};

canvas.addEventListener("click", getCoords);
