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
};

/* --- INIT MOBILE JOYSTICK --- */
var joystick = new JoyStick({
  radius: 50,
  x: window.innerWidth / 2,
  y: window.innerHeight - 100,
  inner_radius: 40,
});

//mobile keys in game.js file
