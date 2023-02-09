/**@type{HTMLCanvasElement} */

function gameEngine() {
  window.requestAnimationFrame(gameEngine);
  background.draw();

  //boundaries
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  //vegetable garden
  vegGarden.forEach((garden) => {
    garden.draw();
    if (garden.cultivated) {
      garden.plant();
      garden.grow();
      garden.harvest();
    }
  });

  player.draw();
  let moving = true;
  player.moving = false;

  /*  -----------------  W  ----------------- */
  if (keys.w.pressed && lastKey === "w") {
    //moving animation
    player.moving = true;
    player.image = player.sprites.up;

    //boundary collision
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    //moving map
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });

    /*  -----------------  A  ----------------- */
  } else if (keys.a.pressed && lastKey === "a") {
    //moving animation
    player.moving = true;
    player.image = player.sprites.left;

    //boundary collision
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    //moving map
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });

    /*  -----------------  S  ----------------- */
  } else if (keys.s.pressed && lastKey === "s") {
    //moving animation
    player.moving = true;
    player.image = player.sprites.down;

    //boundary collision
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    //moving map
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });

    /*  -----------------  D  ----------------- */
  } else if (keys.d.pressed && lastKey === "d") {
    //moving animation
    player.moving = true;
    player.image = player.sprites.right;

    //boundary collision
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    //moving map
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });

    /*  -----------------  SPACE  ----------------- */
  } else if (keys.space.pressed && lastKey === "space") {
    //garden collision
    for (let i = 0; i < vegGarden.length; i++) {
      const garden = vegGarden[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...garden,
            position: {
              x: garden.position.x - 24,
              y: garden.position.y - 24,
            },
          },
        })
      ) {
        //cultivating block
        if (player.inventory.seeds.wheat > 0 && !garden.cultivated) {
          player.inventory.seeds.wheat--;
          garden.cultivated = true;
        }

        //harvest block
        if (garden.cultivated && garden.harvestReady) {
          
          /*           garden.cultivated = false;
          garden.harvestReady = false;
          garden.growStage = 1;
          garden.growTime = null;

          garden.coolDown = true; */

          player.inventory.seeds.wheat++;
          player.inventory.harvest.wheat++;
          break;
        }
        break;
      }
    }
  }

  let prevCount = 0;
  if (player.inventory.seeds.wheat >= prevCount) {
    prevCount = player.inventory.seeds.wheat;
    console.log(
      "seeds: " + player.inventory.seeds.wheat,
      "harvest: " + player.inventory.harvest.wheat
    );
  }
}

gameEngine();
