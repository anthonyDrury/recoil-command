import { selector, selectorFamily } from "recoil";
import { activeItems, itemFamily, lastShot, shotFamily } from "./atoms";

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

      set(atom, (item) => {
        return {
          ...item,
          x: item.veerLeft
            ? item.x - 5 * item.xIncrement
            : item.x + 5 * item.xIncrement,
          y: item.y - 5 * item.yIncrement,
        };
      });
    });
  },
});

export const setNextShot = selector({
  key: "setNextShot",
  get: ({ get }) => {},
  set: ({ get, set }, position: any) => {
    const nextShot = get(getNextShotIndex);
    set(shotFamily(nextShot), position);
    set(activeItems, (items) => [...items, { index: nextShot, type: "SHOT" }]);
    set(lastShot, nextShot);
  },
});

export const getNextShotIndex = selector({
  key: "nextShot",
  get: ({ get }) => get(lastShot) + 1,
});

export const selectElemFamily = selectorFamily({
  key: "MyMultipliedNumber",
  get: ({ id, type }: any) => ({ get }) => {
    return type === "ITEM" ? get(itemFamily(id)) : get(shotFamily(id));
  },
});
