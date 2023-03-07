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

  //joystick controler
  if (joystick.up) {
    keys.w.pressed = true;
    lastKey = "w";
  } else if (joystick.down) {
    keys.s.pressed = true;
    lastKey = "s";
  } else if (joystick.left) {
    keys.a.pressed = true;
    lastKey = "a";
  } else if (joystick.right) {
    keys.d.pressed = true;
    lastKey = "d";
  } else {
    keys.w.pressed = false;
    keys.s.pressed = false;
    keys.a.pressed = false;
    keys.d.pressed = false;
  }

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
    if (player.hand === player.tools[0].name) {
      player.hand = player.tools[1].name;
    } else if (player.hand === player.tools[1].name) {
      player.hand = player.tools[2].name;
    } else if (player.hand === player.tools[2].name) {
      player.hand = player.tools[3].name;
    } else if (player.hand === player.tools[3].name) {
      player.hand = player.tools[0].name;
    }
  }

  /*  -----------------  GARDENING  ----------------- */
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
          player.hand === player.tools[0].name
        ) {
          garden.landPlowed = true;
          player.toolsCooldown -= 10;
          tracker.plow++;
        }

        //cultivating block
        if (
          player.inventory.seeds.quantity > 0 &&
          !garden.cultivated &&
          garden.growStage === 1 &&
          garden.landPlowed &&
          player.hand === player.tools[1].name
        ) {
          player.inventory.seeds.quantity--;
          garden.cultivated = true;
          player.toolsCooldown -= 10;
          tracker.plant++;
          player.tools[1].quantity--;
        }

        //watering block
        if (
          garden.landPlowed &&
          garden.cultivated &&
          !garden.watered &&
          player.hand === player.tools[2].name
        ) {
          garden.watered = true;
          player.toolsCooldown -= 10;
          tracker.water++;
        }

        //harvest and reset block
        if (
          garden.cultivated &&
          garden.harvestReady &&
          garden.growStage === 3 &&
          player.hand === player.tools[3].name
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
          tracker.harvest++;
          player.tools[1].quantity = player.inventory.seeds.quantity;
        }
        break;
      }
    }
  }

  //draw buttons
  gameButtons.forEach((button) => {
    button.draw();
  });

  //regenerating cooldown
  if (player.toolsCooldown < 45) {
    player.toolsCooldown += coolDownSpeed;
  }

  //quests progress
  quests.map((el) => {
    if (!el.completed) {
      if (el.type === "plow") {
        el.count = tracker.plow;
      } else if (el.type === "plant") {
        el.count = tracker.plant;
      } else if (el.type === "water") {
        el.count = tracker.water;
      } else if (el.type === "harvest") {
        el.count = tracker.harvest;
      }
    }
  });

  //quests completion and reset tracker
  quests.map((el) => {
    if (el.count >= el.goal && !el.completed) {
      const questType = el.type;
      el.completed = true;
      tracker.questType = 0;
    }
  });
}

gameEngine();
