import { atom, atomFamily } from "recoil";
import { defaultItem } from "../constants/defaults";

// How often we should refresh the game board
// in milliseconds, used in the gameBoard setInterval
export const gameSpeed = atom({
  key: "gameSpeed",
  default: 50,
});

// Change the enemy will shoot
export const enemyLevel = atom({
  key: "enemyLevel",
  default: 0.01,
});

// to keep track of the last player atom shot
export const lastShot = atom({
  key: "lastShot",
  default: 0,
});

// to keep track of the last enemy atom shot
export const lastEnemyShot = atom({
  key: "lastEnemyShot",
  default: 0,
});

// keys of active items on the board
export const activeItems = atom({
  key: "activeKeys",
  default: [{ index: 0, type: "ITEM" }],
});

export const itemFamily = atomFamily({
  key: "Item",
  default: defaultItem,
});

export const shotFamily = atomFamily({
  key: "Shot",
  default: defaultItem,
});
