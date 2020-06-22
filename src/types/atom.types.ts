export type item = baseItem & {
  xIncrement: number;
  yIncrement: number;
  xCount: number;
  yCount: number;
  veerLeft: boolean;
};

export type baseItem = {
  x: number;
  y: number;
  index: number;
};

export type explosionItem = baseItem & {
  type: "EXPLOSION";
  timer: number;
};

export type enemyItem = baseItem &
  item & {
    type: "ITEM";
  };

export type shotItem = baseItem &
  item & {
    type: "SHOT";
    increment: number;
    target: {
      x: number;
      y: number;
    };
  };

export type itemTrail = baseItem & {
  type: "ITEM_TRAIL";
  startX: number;
  startY: number;
};

export type shotTrail = baseItem & {
  type: "SHOT_TRAIL";
  startX: number;
  startY: number;
};

export type items = itemTrail | explosionItem | enemyItem | shotItem;

export type movingItems = enemyItem | shotItem;

export type itemType = movingItemType | "EXPLOSION" | trailType;

export type trailType = "SHOT_TRAIL" | "ITEM_TRAIL";

export type movingItemType = "SHOT" | "ITEM";

export type itemReference = {
  index: number;
  type: itemType;
};
