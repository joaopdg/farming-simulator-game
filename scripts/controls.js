/**@type{HTMLCanvasElement} */

/* --- CONTROLS --- */
let lastKey;
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
  e: {
    pressed: false,
  },
};

/* --- DESKTOP --- */
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
    case "KeyE":
      keys.e.pressed = false;
      break;
  }
});

/* --- MOBILE --- */
window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("arrowUp")) {
    keys.w.pressed = true;
    lastKey = "w";
  } else if (e.target.classList.contains("arrowLeft")) {
    keys.a.pressed = true;
    lastKey = "a";
  } else if (e.target.classList.contains("arrowDown")) {
    keys.s.pressed = true;
    lastKey = "s";
  } else if (e.target.classList.contains("arrowRight")) {
    keys.d.pressed = true;
    lastKey = "d";
  } else if (e.target.classList.contains("toolsKey")) {
    keys.e.pressed = true;
    lastKey = "e";
  }
});

window.addEventListener("touchend", (e) => {
  if (e.target.classList.contains("arrowUp")) {
    keys.w.pressed = false;
  } else if (e.target.classList.contains("arrowLeft")) {
    keys.a.pressed = false;
  } else if (e.target.classList.contains("arrowDown")) {
    keys.s.pressed = false;
  } else if (e.target.classList.contains("arrowRight")) {
    keys.d.pressed = false;
  } else if (e.target.classList.contains("toolsKey")) {
    keys.e.pressed = false;
  }
});

/* --- SCREENS --- */
window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("icon")) {
    e.target.classList.add("opened");
    document.getElementById("closeScreen").classList.remove("hidden");
  }
  if (e.target.classList.contains("closeButton")) {
    document.getElementById("closeScreen").classList.add("hidden");
    if (document.getElementById("chestDiv").classList.contains("opened")) {
      document.getElementById("chestDiv").classList.remove("opened");
    } else if (
      document.getElementById("questsDiv").classList.contains("opened")
    ) {
      document.getElementById("questsDiv").classList.remove("opened");
    } else if (
      document.getElementById("profileDiv").classList.contains("opened")
    ) {
      document.getElementById("profileDiv").classList.remove("opened");
    } else if (
      document.getElementById("prizesDiv").classList.contains("opened")
    ) {
      document.getElementById("prizesDiv").classList.remove("opened");
    }
  }
});
