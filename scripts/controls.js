/**@type{HTMLCanvasElement} */

/* --- CONTROLS --- */

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
  e: {
    pressed: false,
  },
};

let lastKey;

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "KeyA":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "KeyS":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "KeyD":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "Space":
      keys.space.pressed = true;
      lastKey = "space";
      break;
    case "KeyE":
      keys.e.pressed = true;
      lastKey = "e";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
      keys.w.pressed = false;
      break;
    case "KeyA":
      keys.a.pressed = false;
      break;
    case "KeyS":
      keys.s.pressed = false;
      break;
    case "KeyD":
      keys.d.pressed = false;
      break;
    case "Space":
      keys.space.pressed = false;
      break;
    case "KeyE":
      keys.e.pressed = false;
      break;
  }
});

/* --- MOBILE --- */

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrowUp")) {
    keys.w.pressed = true;
    lastKey = "w";
    setTimeout(() => {
      keys.w.pressed = false;
    }, 100);
  } else if (e.target.classList.contains("arrowLeft")) {
    keys.a.pressed = true;
    lastKey = "a";
    setTimeout(() => {
      keys.a.pressed = false;
    }, 100);
  } else if (e.target.classList.contains("arrowDown")) {
    keys.s.pressed = true;
    lastKey = "s";
    setTimeout(() => {
      keys.s.pressed = false;
    }, 100);
  } else if (e.target.classList.contains("arrowRight")) {
    keys.d.pressed = true;
    lastKey = "d";
    setTimeout(() => {
      keys.d.pressed = false;
    }, 100);
  } else if (e.target.classList.contains("actionKey")) {
    keys.space.pressed = true;
    lastKey = "space";
    setTimeout(() => {
      keys.space.pressed = false;
    }, 100);
  } else if (e.target.classList.contains("toolsKey")) {
    keys.e.pressed = true;
    lastKey = "e";
    setTimeout(() => {
      keys.e.pressed = false;
    }, 100);
  }
});
