/* --- MOBILE KEYS --- */
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


