/**@type{HTMLCanvasElement} */

/* --- PLAYER IMAGES --- */
const playerUp = new Image();
playerUp.src = "../assets/sprites/playerUp.png";
const playerDown = new Image();
playerDown.src = "../assets/sprites/playerDown.png";
const playerLeft = new Image();
playerLeft.src = "../assets/sprites/playerLeft.png";
const playerRight = new Image();
playerRight.src = "../assets/sprites/playerRight.png";

/* --- CREATE PLAYER --- */
let player = new Sprite({
  position: {
    x: canvas.width / 2 - 198 / 4 / 2 + 13,
    /* y: canvas.height / 2 + 68 / 2 + 20, */
    y: canvas.height / 2 - 50,
  },
  image: playerDown,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUp,
    down: playerDown,
    left: playerLeft,
    right: playerRight,
  },
  inventory: {
    seeds: {
      quantity: 5,
    },
    harvest: {
      quantity: 0,
    },
  },
});

/* --- SCREENS --- */
const openedBook = new Image();
openedBook.src = "../assets/images/openedBook.png";

let questBook = new Screen({
  image: openedBook,
  content: quests,
  screen: "quests",
});
let inventory = new Screen({ content: "INVENTORY", screen: "inventory" });
let profile = new Screen({ content: "PROFILE", screen: "profile" });
let prizes = new Screen({ content: "PRIZES", screen: "prizes" });
