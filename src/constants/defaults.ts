import { item, movingItemType, baseItem, itemTrail } from "../types/atom.types";

export const getDefaultItem = <T extends movingItemType>(type: T): item<T> => ({
  x: 0,
  y: 0,
  xIncrement: 0,
  yIncrement: 0,
  veerLeft: false,
  type,
  index: 0,
});

export const getDefaultBaseItem = (): baseItem<"ITEM_TRAIL"> => ({
  x: 0,
  y: 0,
  type: "ITEM_TRAIL",
  index: 0,
});

export const getDefaultItemTrail = (): itemTrail => ({
  x: -1,
  y: -1,
  type: "ITEM_TRAIL",
  index: 0,
  startX: -1,
  startY: -1,
});
