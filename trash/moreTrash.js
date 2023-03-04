/* --- MOBLILE SCREENS --- */
let screenOpen = false;
window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("icon") && !screenOpen) {
    screenOpen = true;
    e.target.classList.add("opened");
    document.getElementById("closeScreen").classList.remove("hidden");
  }
  if (e.target.classList.contains("closeScreen")) {
    document.getElementById("closeScreen").classList.add("hidden");
    if (document.getElementById("chestDiv").classList.contains("opened")) {
      document.getElementById("chestDiv").classList.remove("opened");
      screenOpen = false;
    } else if (
      document.getElementById("questsDiv").classList.contains("opened")
    ) {
      document.getElementById("questsDiv").classList.remove("opened");
      screenOpen = false;
    } else if (
      document.getElementById("profileDiv").classList.contains("opened")
    ) {
      document.getElementById("profileDiv").classList.remove("opened");
      screenOpen = false;
    } else if (
      document.getElementById("prizesDiv").classList.contains("opened")
    ) {
      document.getElementById("prizesDiv").classList.remove("opened");
      screenOpen = false;
    }
  }
});


  //draw screens
  if (document.getElementById("chestDiv").classList.contains("opened")) {
    inventory.draw();
  } else if (
    document.getElementById("questsDiv").classList.contains("opened")
  ) {
    questBook.draw();
  } else if (
    document.getElementById("profileDiv").classList.contains("opened")
  ) {
    profile.draw();
  } else if (
    document.getElementById("prizesDiv").classList.contains("opened")
  ) {
    prizes.draw();
  }





  /* --- SCREENS --- */
const openedBook = new Image();
openedBook.src = "../assets/images/openedBook.png";

let questBook = new Screen({
  image: openedBook,
  content: quests,
  screen: "quests",
});
let inventory = new Screen({ content: "INVENTORY", screen: "inventory" });
let profile = new Screen({ content: "PROFILE", screen: "profile" });
let prizes = new Screen({ content: "PRIZES", screen: "prizes" });





