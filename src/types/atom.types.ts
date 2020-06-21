export type item = baseItem & {
  xIncrement: number;
  yIncrement: number;
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

export type items = itemTrail | explosionItem | enemyItem | shotItem;

export type movingItems = enemyItem | shotItem;

export type itemType = movingItemType | "EXPLOSION" | "ITEM_TRAIL";

export type movingItemType = "SHOT" | "ITEM";

export type itemReference = {
  index: number;
  type: itemType;
};
