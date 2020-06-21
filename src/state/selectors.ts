import { selector, selectorFamily, RecoilState, RecoilValue } from "recoil";
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
  enemyIncrement,
  enemyLevel,
  itemTrailFamily,
  lastEnemyTrail,
} from "./atoms";
import {
  isSameItem,
  determineCollisions,
  isSameItemOrTrailFor,
} from "../helpers/atom.utils";
import {
  item,
  items,
  itemTrail,
  movingItemType,
  movingItems,
  shotItem,
  enemyItem,
} from "../types/atom.types";
import { getNumberInRange } from "../helpers/common.utils";

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
    if (get(getHasLost)) {
      return;
    }
    const itemIDs = get(activeItems);
    const items = itemIDs
      .filter((ref) => ref.type !== "ITEM_TRAIL")
      .map((ref) => {
        const atom =
          ref.type === "ITEM" ? itemFamily(ref.index) : shotFamily(ref.index);
        return get(atom as RecoilValue<shotItem>);
      });

    const {
      shotCollisions,
      defenceCollisions,
      newStates,
      isDefenceHit,
    } = determineCollisions(items);

    newStates.forEach((newItem: items) => {
      // If shot collides, adjust points/power and remove active item
      if (
        shotCollisions.get(`${newItem.type}_${newItem.index}`) !== undefined
      ) {
        shotCollisions.delete(`${newItem.type}_${newItem.index}`);
        set(removeActiveItem, newItem);

        // limit power to 100
        set(powerBar, (val) => getNumberInRange(val + 10, 0, 100));

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
          set(itemFamily(newItem.index), newItem as enemyItem);
          set(setItemTrail, newItem);
        } else {
          set(shotFamily(newItem.index), newItem as shotItem);
        }
      }
    });
    if (get(defenceHit) !== isDefenceHit) {
      set(defenceHit, isDefenceHit);
    }
    if (isDefenceHit) {
      set(defenceBar, (val) => getNumberInRange(val - 10, 0, 100));
    }
    set(enemyIncrement, (val) => {
      let newVal = val + 1;
      if (newVal === 200) {
        set(enemyLevel, (level) => level + 0.01);
        newVal = 1;
      }
      return newVal;
    });
  },
});

export const setItemTrail = selector({
  key: "setItemTrail",
  get: () => {},
  set: ({ set }, item: any) => {
    let isNew: boolean = false;
    set(
      itemTrailFamily(item.index),
      (val): itemTrail => {
        isNew = val.startX === -1;
        return {
          index: item.index,
          type: "ITEM_TRAIL",
          x: item.x,
          y: item.y,
          startX: val.startX > 0 ? val.startX : item.x,
          startY: val.startY > 0 ? val.startY : item.y,
        };
      }
    );
    if (isNew) {
      set(activeItems, (items) => [
        ...items,
        { index: item.index, type: "ITEM_TRAIL" },
      ]);
    }
  },
});

export const removeActiveItem = selector({
  key: "removeActiveItem",
  get: () => {},
  set: ({ set }, item: any) => {
    set(activeItems, (items) => {
      return items.filter((itemRef) => {
        // Remove item from list and remove trail for that item
        return !isSameItemOrTrailFor(item, itemRef);
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
    } as shotItem);
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

export const getReadableLevel = selector({
  key: "getReadableLevel",
  get: ({ get }) => Math.round(get(enemyLevel) * 100),
});

export const getHasLost = selector({
  key: "getLevel",
  get: ({ get }) => get(defenceBar) <= 0,
});

export const selectElemFamily = selectorFamily({
  key: "MyMultipliedNumber",
  get: ({ id, type }: any) => ({ get }) => {
    return type === "ITEM" ? get(itemFamily(id)) : get(shotFamily(id));
  },
});
