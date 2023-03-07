/* --- CANVAS SETUP --- */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* --- CULTIVATED TIME --- */
const stageOneTime = 3000; //10000
const stageTwoTime = 6000; //20000

/* --- TOOLS COOLDOWN --- */
const coolDownSpeed = 0.08;

/* --- BOUNDARIES --- */
const oppacity = 0.0;
const pixelRatio = 24;

/* --- CLICK COORDINATES --- */
let click = {
  x: 0,
  y: 0,
};

/* --- CHECK IF ANY SCREEN IS OPEN --- */
let screenOnTop = false;
