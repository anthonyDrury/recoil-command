import {
  itemTrail,
  enemyItem,
  shotItem,
  explosionItem,
  shotTrail,
} from "../types/atom.types";

export const defaultEnemyItem: enemyItem = {
  x: 0,
  y: 0,
  xIncrement: 0,
  yIncrement: 0,
  xCount: 0,
  yCount: 0,
  veerLeft: false,
  type: "ITEM",
  index: 0,
};

export const defaultShotItem: shotItem = {
  x: 0,
  y: 0,
  xIncrement: 0,
  yIncrement: 0,
  xCount: 0,
  yCount: 0,
  veerLeft: false,
  type: "SHOT",
  index: 0,
  target: {
    x: 0,
    y: 0,
  },
  increment: 10,
};

export const defaultItemTrail: itemTrail = {
  x: -1,
  y: -1,
  type: "ITEM_TRAIL",
  index: 0,
  startX: -1,
  startY: -1,
};

export const defaultShotTrail: shotTrail = {
  x: -1,
  y: -1,
  type: "SHOT_TRAIL",
  index: 0,
  startX: -1,
  startY: -1,
};

export const defaultExplosion: explosionItem = {
  x: -1,
  y: -1,
  type: "EXPLOSION",
  index: 0,
  timer: 40,
};
