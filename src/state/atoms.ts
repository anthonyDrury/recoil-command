import { atom, atomFamily } from "recoil";
import { item, itemReference } from "../types/atom.types";
import { getDefaultItem } from "../constants/defaults";

// How often we should refresh the game board
// in milliseconds, used in the gameBoard setInterval
export const gameSpeed = atom<number>({
  key: "gameSpeed",
  default: 50,
});

// Change the enemy will shoot
export const enemyLevel = atom<number>({
  key: "enemyLevel",
  default: 0.01,
});

// to keep track of the last player atom shot
export const lastShot = atom<number>({
  key: "lastShot",
  default: 0,
});

// to keep track of the last enemy atom shot
export const lastEnemyShot = atom<number>({
  key: "lastEnemyShot",
  default: 0,
});

// keys of active items on the board
export const activeItems = atom<itemReference[]>({
  key: "activeKeys",
  default: [{ index: 0, type: "ITEM" }],
});

export const itemFamily = atomFamily<item<"ITEM">, number>({
  key: "Item",
  default: getDefaultItem("ITEM"),
});

export const shotFamily = atomFamily<item<"SHOT">, number>({
  key: "Shot",
  default: getDefaultItem("SHOT"),
});
