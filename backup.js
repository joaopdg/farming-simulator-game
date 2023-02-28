/* --- MOBLILE SCREENS --- */
let screenOpen = false;

window.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains("icon") && !screenOpen) {
    screenOpen = true;
    e.target.classList.add("opened");
    document.getElementById("closeScreen").classList.remove("hidden");
  }

  const allIcons = document.getElementsByTagName("img");
  if (allIcons.map((icon) => icon.classList.contains("opened"))) {
    icon.classList.remove("opened");
    screenOpen = false;
    document.getElementById("closeScreen").classList.add("hidden");
  }
});