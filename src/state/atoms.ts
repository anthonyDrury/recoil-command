import { atom, atomFamily } from "recoil";
import {
  itemReference,
  itemTrail,
  enemyItem,
  shotItem,
  explosionItem,
  shotTrail,
} from "../types/atom.types";
import {
  defaultExplosion,
  defaultEnemyItem,
  defaultShotItem,
  defaultItemTrail,
  defaultShotTrail,
} from "../constants/defaults";

// How often we should refresh the game board
// in milliseconds, used in the gameBoard setInterval
export const gameSpeed = atom<number>({
  key: "gameSpeed",
  default: 50,
});

// Change how often the enemy will shoot
export const enemyLevel = atom<number>({
  key: "enemyLevel",
  default: 0.01,
});

// Keep track of when the enemy levels up
export const enemyIncrement = atom<number>({
  key: "enemyLevelIncrement",
  default: 0,
});

// Whether the defence was hit this render
export const defenceHit = atom<boolean>({
  key: "defenceHit",
  default: false,
});

// Strength of players defence
export const defenceBar = atom<number>({
  key: "defenceBar",
  default: 100,
});

// Power player has left
export const powerBar = atom<number>({
  key: "powerBar",
  default: 100,
});

// Player points accumulated
export const points = atom<number>({
  key: "points",
  default: 0,
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

// to keep track of the last enemy atom shot
export const lastEnemyTrail = atom<number>({
  key: "lastEnemyTrail",
  default: 0,
});

// to keep track of the last explosion
export const lastExplosion = atom<number>({
  key: "lastExplosion",
  default: 0,
});

// keys of active items on the board
export const activeItems = atom<itemReference[]>({
  key: "activeKeys",
  default: [],
});

export const itemFamily = atomFamily<enemyItem, number>({
  key: "stem",
  default: defaultEnemyItem,
});

export const shotFamily = atomFamily<shotItem, number>({
  key: "shot",
  default: defaultShotItem,
});

export const itemTrailFamily = atomFamily<itemTrail, number>({
  key: "itemTrail",
  default: defaultItemTrail,
});

export const shotTrailFamily = atomFamily<shotTrail, number>({
  key: "shotTrail",
  default: defaultShotTrail,
});

export const explosionFamily = atomFamily<explosionItem, number>({
  key: "explosion",
  default: defaultExplosion,
});
