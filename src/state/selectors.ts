import { selector, selectorFamily } from "recoil";
import {
  activeItems,
  itemFamily,
  lastShot,
  shotFamily,
  lastEnemyShot,
} from "./atoms";
import { calculateNextItemState } from "../helpers/atom.utils";

export const getActiveItems = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const itemIDs = get(activeItems);
    const items = itemIDs.map((key) => get(itemFamily(key)));

    return items;
  },
});

export const updateItemsPositions = selector({
  key: "updateActiveItemPositions",
  get: () => {},
  set: ({ get, set }) => {
    const itemIDs = get(activeItems);
    itemIDs.forEach((ref) => {
      const atom =
        ref.type === "ITEM" ? itemFamily(ref.index) : shotFamily(ref.index);

      set(atom, (item) => calculateNextItemState(item));
    });
  },
});

export const setNextShot = selector({
  key: "setNextShot",
  get: ({ get }) => {},
  set: ({ get, set }, position: any) => {
    const nextShot = get(getNextShotIndex);
    set(shotFamily(nextShot), {
      ...position,
      index: nextShot,
      type: "SHOT",
    });
    set(activeItems, (items) => [...items, { index: nextShot, type: "SHOT" }]);
    set(lastShot, nextShot);
  },
});

export const setEnemyShot = selector({
  key: "setNextEnemyShot",
  get: ({ get }) => {},
  set: ({ get, set }, position: any) => {
    const nextShot = get(getNextEnemyShotIndex);
    set(itemFamily(nextShot), {
      ...position,
      index: nextShot,
      type: "ITEM",
    });
    set(activeItems, (items) => [...items, { index: nextShot, type: "ITEM" }]);
    set(lastEnemyShot, nextShot);
  },
});

export const getNextShotIndex = selector({
  key: "nextShot",
  get: ({ get }) => get(lastShot) + 1,
});

export const getNextEnemyShotIndex = selector({
  key: "nextEnemyShot",
  get: ({ get }) => get(lastEnemyShot) + 1,
});

export const selectElemFamily = selectorFamily({
  key: "MyMultipliedNumber",
  get: ({ id, type }: any) => ({ get }) => {
    return type === "ITEM" ? get(itemFamily(id)) : get(shotFamily(id));
  },
});
