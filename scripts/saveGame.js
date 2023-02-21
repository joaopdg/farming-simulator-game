/* --- GET SAVED GAME --- */
let savedGame = JSON.parse(localStorage.getItem("gameSaveData"));
console.log(savedGame);
/* --- LOAD SAVED GAME --- */
if (savedGame) {
  //loading player
  player.inventory = savedGame.player.inventory;
  player.hand = savedGame.player.hand;

  //loading boundaries
  boundaries.map((el, i) => {
    el.position.x = savedGame.boundaries[i].x;
    el.position.y = savedGame.boundaries[i].y;
  });

  //loading background

  background.position.x = savedGame.background.x;
  background.position.y = savedGame.background.y;

  //loading vegetable garden
  vegGarden.map((el, i) => {
    el.landPlowed = savedGame.garden[i].landPlowed;
    el.cultivated = savedGame.garden[i].cultivated;
    el.growTime = savedGame.garden[i].growTime;
    el.growStage = savedGame.garden[i].growStage;
    el.harvestReady = savedGame.garden[i].harvestReady;
    el.watered = savedGame.garden[i].watered;
    el.position.x = savedGame.garden[i].x;
    el.position.y = savedGame.garden[i].y;
  });
}

/* --- FUNCTION TO SAVE GAME --- */
const saveGame = () => {
  //save vegetable garden
  let savedVegGarden = [];
  vegGarden.map((el) => {
    savedVegGarden.push({
      landPlowed: el.landPlowed,
      cultivated: el.cultivated,
      growTime: el.growTime,
      growStage: el.growStage,
      harvestReady: el.harvestReady,
      watered: el.watered,
      x: el.position.x,
      y: el.position.y,
    });
  });

  //save boundaries
  let savedBoundaries = [];
  boundaries.map((el) => {
    savedBoundaries.push({
      x: el.position.x,
      y: el.position.y,
    });
  });

  let gameSaveData = {
    player: {
      inventory: player.inventory,
      hand: player.hand,
    },
    garden: savedVegGarden,
    boundaries: savedBoundaries,
    background: {
      x: background.position.x,
      y: background.position.y,
    },
    offset: {
      x: offset.x,
      y: offset.y,
    },
  };

  localStorage.setItem("gameSaveData", JSON.stringify(gameSaveData));

  console.log("Game saved!");
};

/* --- AUTOSAVE EVERY 10 SECONDS --- */
setInterval(() => {
  saveGame();
}, 10000);

/* --- BUTTON TO SAVE GAME --- */
window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("saveGame")) {
    saveGame();
  }
});
