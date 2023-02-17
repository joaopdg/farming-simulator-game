/* --- GET SAVED GAME --- */
let savedGame = JSON.parse(localStorage.getItem("gameSaveData"));

/* --- LOAD SAVED GAME --- */
if (savedGame) {
  //loading player
  player.inventory = savedGame.player.inventory;
  player.hand = savedGame.player.hand;

  //loading vegetable garden
  for (let i = 0; i < vegGarden.length; i++) {
    for (let j = 0; j < savedGame.garden.length; j++) {
      if (i === savedGame.garden[j].index) {
        vegGarden[i].landPlowed = savedGame.garden[j].landPlowed;
        vegGarden[i].cultivated = savedGame.garden[j].cultivated;
        vegGarden[i].growTime = savedGame.garden[j].growTime;
        vegGarden[i].growStage = savedGame.garden[j].growStage;
        vegGarden[i].harvestReady = savedGame.garden[j].harvestReady;
        vegGarden[i].watered = savedGame.garden[j].watered;
      }
    }
  }
}

/* --- SAVING CURRENT GAME --- */
const saveGame = () => {
  let savedVegGarden = [];
  vegGarden.map((el, i) => {
    if (el.landPlowed) {
      savedVegGarden.push({
        index: i,

        landPlowed: el.landPlowed,
        cultivated: el.cultivated,
        growTime: el.growTime,
        growStage: el.growStage,
        harvestReady: el.harvestReady,
        watered: el.watered,
      });
    }
  });

  let gameSaveData = {
    player: {
      inventory: player.inventory,
      hand: player.hand,
    },
    garden: savedVegGarden,
  };

  localStorage.setItem("gameSaveData", JSON.stringify(gameSaveData));

  console.log("Game saved!");
};

setInterval(() => {
  saveGame();
}, 10000);

window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("saveGame")) {
    saveGame();
  }
});
