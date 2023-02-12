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
    if (garden.landPlowed && !garden.cultivated) {
      garden.plow();
      garden.plant();
    }
    if (garden.cultivated) {
      garden.grow();
      garden.harvest();
      garden.plant();
    }
  });

  player.draw();
  player.drawInventory();
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
        //plow land
        if (!garden.cultivated && !garden.landPlowed && player.hand === "hoe") {
          garden.landPlowed = true;
        }

        //cultivating block
        if (
          player.inventory.seeds.wheat > 0 &&
          !garden.cultivated &&
          garden.growStage === 1 &&
          garden.landPlowed &&
          player.hand === "seeds"
        ) {
          player.inventory.seeds.wheat--;
          garden.cultivated = true;
        }

        //watering block
        if (
          garden.landPlowed &&
          garden.cultivated &&
          !garden.watered &&
          player.hand === "wateringCan"
        ) {
          garden.watered = true;
        }

        //harvest block
        if (
          garden.cultivated &&
          garden.harvestReady &&
          garden.growStage === 3 &&
          player.hand === "empty"
        ) {
          garden.cultivated = false;
          garden.harvestReady = false;
          garden.growTime = null;
          garden.landPlowed = false;
          garden.watered = false;
          garden.image = resetBlock;

          const randomSeeds = Math.floor(Math.random() * (3 - 1) + 1);
          const randomItems = Math.floor(Math.random() * (4 - 1) + 1);
          player.inventory.seeds.wheat += randomSeeds;
          player.inventory.harvest.wheat += randomItems;

          setTimeout(() => {
            garden.growStage = 1;
            garden.image = cultivedImg;
          }, 2000);
        }

        break;
      }
    }

    /*  -----------------  E  ----------------- */
  } else if (keys.e.pressed && lastKey === "e") {
    lastKey = "";
    if (player.hand === "empty") {
      player.hand = "hoe";
    } else if (player.hand === "hoe") {
      player.hand = "seeds";
    } else if (player.hand === "seeds") {
      player.hand = "wateringCan";
    } else if (player.hand === "wateringCan") {
      player.hand = "empty";
    }
  }
}


gameEngine();
