export type item<T extends itemType = "SHOT" | "ITEM"> = {
  x: number;
  y: number;
  xIncrement: number;
  yIncrement: number;
  type: T;
  veerLeft: boolean;
  index: number;
};

export type itemType = "SHOT" | "ITEM";

export type itemReference = {
  index: number;
  type: string;
};
