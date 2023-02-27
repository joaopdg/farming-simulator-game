/**@type{HTMLCanvasElement} */

/* --- GAME ENGINE --- */
function gameEngine() {
  window.requestAnimationFrame(gameEngine);

  //draw map
  background.draw();

  //draw boundaries
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  //draw vegetable garden
  vegGarden.forEach((garden) => {
    garden.draw();
    if (garden.landPlowed && !garden.cultivated) {
      garden.plant();
    }
    if (garden.cultivated) {
      garden.grow();
      garden.harvest();
      garden.plant();
    }
  });

  //draw player
  player.draw();
  player.drawHand();
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
        movable.position.y += 1.5;
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
        movable.position.x += 1.5;
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
        movable.position.y -= 1.5;
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
        movable.position.x -= 1.5;
      });

    /*  -----------------  E  ----------------- */
  } else if (keys.e.pressed && lastKey === "e") {
    lastKey = "";
    if (player.hand === player.tools[0]) {
      player.hand = player.tools[1];
    } else if (player.hand === player.tools[1]) {
      player.hand = player.tools[2];
    } else if (player.hand === player.tools[2]) {
      player.hand = player.tools[3];
    } else if (player.hand === player.tools[3]) {
      player.hand = player.tools[0];
    }
  }

  /*  -----------------  SPACE  ----------------- */
  //garden collision
  if (player.toolsCooldown >= 10) {
    for (let i = 0; i < vegGarden.length; i++) {
      const garden = vegGarden[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...garden,
            position: {
              x: garden.position.x - 14,
              y: garden.position.y - 14,
            },
          },
        })
      ) {
        //plow land
        if (
          !garden.cultivated &&
          !garden.landPlowed &&
          player.hand === player.tools[0]
        ) {
          garden.landPlowed = true;
          player.toolsCooldown -= 10;
        }

        //cultivating block
        if (
          player.inventory.seeds.quantity > 0 &&
          !garden.cultivated &&
          garden.growStage === 1 &&
          garden.landPlowed &&
          player.hand === player.tools[1]
        ) {
          player.inventory.seeds.quantity--;
          garden.cultivated = true;
          player.toolsCooldown -= 10;
        }

        //watering block
        if (
          garden.landPlowed &&
          garden.cultivated &&
          !garden.watered &&
          player.hand === player.tools[2]
        ) {
          garden.watered = true;
          player.toolsCooldown -= 10;
        }

        //harvest block
        if (
          garden.cultivated &&
          garden.harvestReady &&
          garden.growStage === 3 &&
          player.hand === player.tools[3]
        ) {
          garden.cultivated = false;
          garden.harvestReady = false;
          garden.growTime = null;
          garden.landPlowed = false;
          garden.watered = false;
          garden.image = resetBlock;

          const randomSeeds = Math.floor(Math.random() * (3 - 1) + 1);
          const randomItems = Math.floor(Math.random() * (4 - 1) + 1);
          player.inventory.seeds.quantity += randomSeeds;
          player.inventory.harvest.quantity += randomItems;

          setTimeout(() => {
            garden.growStage = 1;
            garden.image = cultivedImg;
          }, 2000);

          player.toolsCooldown -= 10;
        }
        break;
      }
    }
  }

  //regenerating cooldown
  if (player.toolsCooldown < 45) {
    player.toolsCooldown += 0.05;
  }

  //screens
  if (document.getElementById("chestDiv").classList.contains("opened")) {
    player.drawChest();
  } else if (
    document.getElementById("questsDiv").classList.contains("opened")
  ) {
    player.drawQuests();
  } else if (
    document.getElementById("profileDiv").classList.contains("opened")
  ) {
    player.drawProfile();
  } /* else if (
    document.getElementById("prizesDiv").classList.contains("opened")
  ) {
    player.drawPrizes();
  } */
}

gameEngine();
