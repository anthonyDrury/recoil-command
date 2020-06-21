import { selector, selectorFamily, RecoilState } from "recoil";
import {
  activeItems,
  itemFamily,
  lastShot,
  shotFamily,
  lastEnemyShot,
  defenceHit,
  defenceBar,
  powerBar,
  points,
} from "./atoms";
import { isSameItem, determineCollisions } from "../helpers/atom.utils";
import { item } from "../types/atom.types";
import { getNumberInRange } from "../helpers/common.utils";
import DefenceBar from "../components/DefenceBar";

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

// This is the main setter function responsible
// for updating all the positions and most of the values
// of the atoms.
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
    const {
      shotCollisions,
      defenceCollisions,
      newStates,
      isDefenceHit,
    } = determineCollisions(items);

    newStates.forEach((newItem: item) => {
      // If shot collides, adjust points/power and remove active item
      if (
        shotCollisions.get(`${newItem.type}_${newItem.index}`) !== undefined
      ) {
        shotCollisions.delete(`${newItem.type}_${newItem.index}`);
        set(removeActiveItem, newItem);

        // limit power to 100
        set(powerBar, (val) => getNumberInRange(val + 5, 0, 100));

        // Since per collision there us two items
        set(points, (val) => val + 0.5);
      }
      // If enemy shot collides with defence, adjust defence
      else if (
        defenceCollisions.get(`${newItem.type}_${newItem.index}`) !== undefined
      ) {
        set(removeActiveItem, newItem);
        shotCollisions.delete(`${newItem.type}_${newItem.index}`);
      } else {
        set(powerBar, (val) => getNumberInRange(val + 0.001, 0, 100));
        if (newItem.type === "ITEM") {
          set(itemFamily(newItem.index), newItem as item<"ITEM">);
        } else {
          set(shotFamily(newItem.index), newItem as item<"SHOT">);
        }
      }
    });
    if (get(defenceHit) !== isDefenceHit) {
      set(defenceHit, isDefenceHit);
    }
    if (isDefenceHit) {
      set(defenceBar, (val) => getNumberInRange(val - 10, 0, 100));
    }
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
    const power = get(powerBar);
    if (power < 5) {
      return;
    }
    const nextShot = get(getNextShotIndex);
    set(shotFamily(nextShot), {
      ...position,
      index: nextShot,
      type: "SHOT",
    } as item<"SHOT">);
    set(activeItems, (items) => [...items, { index: nextShot, type: "SHOT" }]);
    set(powerBar, (val) => getNumberInRange(val - 5, 0, 100));
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

export const getHasLost = selector({
  key: "getHasLost",
  get: ({ get }) => get(defenceBar) <= 0,
});

export const selectElemFamily = selectorFamily({
  key: "MyMultipliedNumber",
  get: ({ id, type }: any) => ({ get }) => {
    return type === "ITEM" ? get(itemFamily(id)) : get(shotFamily(id));
  },
});
