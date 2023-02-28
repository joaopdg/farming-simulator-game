/* --- QUEST's SETUP --- */

let tracker = {
  plowed: 0,
  planted: 0,
  watered: 0,
  harvested: 0,
};

let quests = [
  {
    desc: "Plow 10 times",
    type: "plow",
    count: 0,
    goal: 10,
    completed: false,
    reward: false,
  },
  {
    desc: "Plant 10 seeds",
    type: "plant",
    count: 0,
    goal: 10,
    completed: false,
    reward: false,
  },
  {
    desc: "Water 15 seeds",
    type: "water",
    count: 0,
    goal: 15,
    completed: false,
    reward: false,
  },
  {
    desc: "Harvest 20 times",
    type: "harvest",
    count: 0,
    goal: 15,
    completed: false,
    reward: false,
  },
];
