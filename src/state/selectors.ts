import { selector, selectorFamily, RecoilState } from "recoil";
import {
  activeItems,
  itemFamily,
  lastShot,
  shotFamily,
  lastEnemyShot,
} from "./atoms";
import { isSameItem, determineCollisions } from "../helpers/atom.utils";
import { item } from "../types/atom.types";

export const getActiveItems = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const itemIDs = get(activeItems);
    const items = itemIDs.map((key) => {
      if (key.type === "SHOT") {
        return get(shotFamily(key.index));
      } else {
        return get(itemFamily(key.index));
      }
    });

    return items;
  },
});

export const updateItemsPositions = selector({
  key: "updateActiveItemPositions",
  get: () => {},
  set: ({ get, set }) => {
    const itemIDs = get(activeItems);
    const items = itemIDs.map((ref) => {
      const atom =
        ref.type === "ITEM"
          ? itemFamily(ref.index)
          : (shotFamily(ref.index) as RecoilState<item>);
      return get(atom);
    });
    const { collisions, newStates } = determineCollisions(items);

    newStates.forEach((newItem: item) => {
      if (collisions.has(newItem)) {
        console.log("COLLISION");
        set(removeActiveItem, newItem);
      } else {
        console.log(newItem);
        if (newItem.type === "ITEM") {
          set(itemFamily(newItem.index), newItem as item<"ITEM">);
        } else {
          set(shotFamily(newItem.index), newItem as item<"SHOT">);
        }
      }
    });
  },
});

export const removeActiveItem = selector({
  key: "removeActiveItem",
  get: () => {},
  set: ({ set }, item: any) => {
    set(activeItems, (items) => {
      return items.filter((itemRef) => {
        return !isSameItem(item, itemRef);
      });
    });
  },
});

export const setNextShot = selector({
  key: "setNextShot",
  get: () => {},
  set: ({ get, set }, position: any) => {
    const nextShot = get(getNextShotIndex);
    set(shotFamily(nextShot), {
      ...position,
      index: nextShot,
      type: "SHOT",
    } as item<"SHOT">);
    set(activeItems, (items) => [...items, { index: nextShot, type: "SHOT" }]);
    set(lastShot, nextShot);
  },
});

export const setEnemyShot = selector({
  key: "setNextEnemyShot",
  get: () => {},
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
