import { itemType, item } from "../types/atom.types";

export const getDefaultItem = <T extends itemType>(type: T): item<T> => ({
  x: 0,
  y: 0,
  xIncrement: 0,
  yIncrement: 0,
  veerLeft: false,
  type,
  index: 0,
});
