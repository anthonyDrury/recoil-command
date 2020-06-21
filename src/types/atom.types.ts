export type item<T extends movingItemType = movingItemType> = baseItem & {
  xIncrement: number;
  yIncrement: number;
  veerLeft: boolean;
  type: T;
};

export type baseItem<T extends itemType = itemType> = {
  x: number;
  y: number;
  type: T;
  index: number;
};

export type itemTrail = baseItem & {
  type: "ITEM_TRAIL";
  startX: number;
  startY: number;
};

export type itemType = movingItemType | "ITEM_TRAIL";

export type movingItemType = "SHOT" | "ITEM";

export type itemReference = {
  index: number;
  type: itemType;
};
