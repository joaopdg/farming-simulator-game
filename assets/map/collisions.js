/**@type{HTMLCanvasElement} */

/* --- BOUNDARIES --- */
//dividing the collisions array into a 2D array
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

//creating the boundaries in the map
const boundaries = [];
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});

/* --- GARDEN --- */
const gardenMap = [];
for (let i = 0; i < garden.length; i += 70) {
  gardenMap.push(garden.slice(i, 70 + i));
}

let vegGarden = [];
gardenMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      vegGarden.push(
        new Garden({
          position: {
            x: j * Garden.width + offset.x,
            y: i * Garden.height + offset.y,
          },
          image: cultivedImg,
        })
      );
    }
  });
});

/* --- MOVEBLE ELEMENTS --- */
//agregate everything that needs to move when the player moves
let movables = [background, ...boundaries, ...vegGarden];

/* --- CHECK COLLISIONS --- */
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}
