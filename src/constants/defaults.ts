import {
  itemTrail,
  enemyItem,
  shotItem,
  explosionItem,
} from "../types/atom.types";

export const getDefaultEnemyItem = (): enemyItem => ({
  x: 0,
  y: 0,
  xIncrement: 0,
  yIncrement: 0,
  veerLeft: false,
  type: "ITEM",
  index: 0,
});

export const getDefaultShotItem = (): shotItem => ({
  x: 0,
  y: 0,
  xIncrement: 0,
  yIncrement: 0,
  veerLeft: false,
  type: "SHOT",
  index: 0,
  target: {
    x: 0,
    y: 0,
  },
});

export const getDefaultItemTrail = (): itemTrail => ({
  x: -1,
  y: -1,
  type: "ITEM_TRAIL",
  index: 0,
  startX: -1,
  startY: -1,
});

export const getDefaultExplosion = (): explosionItem => ({
  x: -1,
  y: -1,
  type: "EXPLOSION",
  index: 0,
  // three seconds
  timer: 60,
});
