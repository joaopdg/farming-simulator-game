/**@type{HTMLCanvasElement} */

const gameButtons = [
  new Gui({
    x: canvas.width / 2 - window.innerWidth / 3,
    y: canvas.height / 2 - window.innerHeight / 3,
    width: 40,
    height: 40,
    image: iconBook,
  }),
];

/* --- CHECK IF CLICK COLLIDES WITH BUTTON --- */
const clickCollision = (click) => {
  gameButtons.map((button) => {
    if (
      click.x >= button.x &&
      click.x <= button.x + button.width + 20 &&
      click.y >= button.y &&
      click.y <= button.y + button.height + 20
    ) {
      button.clicked = true;
      console.log("clicked");
    }
  });
};

/* --- CHECK WHERE USER CLICKED --- */
let click = {
  x: 100,
  y: 100,
};

const getCoords = (event) => {
  const container = canvas.getBoundingClientRect();
  /*   const x = event.clientX - container.left - 200;
  const y = event.clientY - container.top - 20; */
  const x = event.clientX - container.left /2
  const y = event.clientY - container.top/2


  click = {
    x: x,
    y: y,
  };

  console.log("cX: " + x);
  console.log("cY: " + y);
  return clickCollision(click);
};

canvas.addEventListener("click", getCoords);
