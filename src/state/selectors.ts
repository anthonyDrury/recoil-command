import { selector, selectorFamily, RecoilValue } from "recoil";
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
  explosionFamily,
  lastExplosion,
  shotTrailFamily,
} from "./atoms";
import {
  determineCollisions,
  isSameItemOrTrailFor,
} from "../helpers/atom.utils";
import {
  itemTrail,
  shotItem,
  enemyItem,
  explosionItem,
  shotTrail,
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
      .filter(
        (ref) =>
          ref.type === "ITEM" || ref.type === "SHOT" || ref.type === "EXPLOSION"
      )
      .map((ref) => {
        const atom =
          ref.type === "ITEM"
            ? itemFamily(ref.index)
            : ref.type === "SHOT"
            ? shotFamily(ref.index)
            : explosionFamily(ref.index);
        return get(atom as RecoilValue<shotItem>);
      });

    const {
      targetCollisions,
      defenceCollisions,
      missileCollisions,
      newStates,
      isDefenceHit,
    } = determineCollisions(items);

    newStates.forEach((newItem) => {
      // If shot reaches target, adjust points/power and removes active item
      // sets explosion
      if (
        newItem.type === "SHOT" &&
        targetCollisions.get(`${newItem.type}_${newItem.index}`) !== undefined
      ) {
        targetCollisions.delete(`${newItem.type}_${newItem.index}`);
        // remove player shot
        set(removeActiveItem, newItem);
        // remove player shot trail
        set(removeActiveItem, { ...newItem, type: "SHOT_TRAIL" });
        // limit power to 100
        set(powerBar, (val) => getNumberInRange(val + 2.5, 0, 100));
      }
      // If enemy shot collides with defence
      // Remove item
      else if (
        newItem.type === "ITEM" &&
        defenceCollisions.get(`${newItem.type}_${newItem.index}`) !== undefined
      ) {
        set(removeActiveItem, newItem);
      }
      // If enemy shot has hit explosion
      // Remove item, add explosion, and increment points
      else if (
        newItem.type === "ITEM" &&
        missileCollisions.get(`${newItem.type}_${newItem.index}`) !== undefined
      ) {
        missileCollisions.delete(`${newItem.type}_${newItem.index}`);
        set(removeActiveItem, newItem);
        set(setExplosion, newItem);
        set(points, (val) => val + 1);
      } else {
        set(powerBar, (val) => getNumberInRange(val + 0.003, 0, 100));
        switch (newItem.type) {
          case "ITEM":
            set(itemFamily(newItem.index), newItem as enemyItem);
            set(setItemTrail, newItem);
            break;
          case "SHOT":
            set(setShot, newItem);
            break;
          case "EXPLOSION":
            set(explosionFamily(newItem.index), (exp: explosionItem) => {
              const newTimer = exp.timer - 1;
              if (newTimer < 1) {
                set(removeActiveItem, newItem);
              }
              return {
                ...exp,
                timer: newTimer,
              };
            });
            break;
          default:
            break;
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

export const setShot = selector({
  key: "setShot",
  get: () => {},
  set: ({ set }, item: any) => {
    set(shotFamily(item.index), item);
    set(setShotTrail, item);
  },
});

export const setShotTrail = selector({
  key: "setShotTrail",
  get: () => {},
  set: ({ set }, item: any) => {
    let isNew: boolean = false;
    set(
      shotTrailFamily(item.index),
      (val): shotTrail => {
        isNew = val.startX === -1;
        return {
          index: item.index,
          type: "SHOT_TRAIL",
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
        { index: item.index, type: "SHOT_TRAIL" },
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
    set(setExplosion, { ...position.target });
    set(shotFamily(nextShot), {
      ...position,
      index: nextShot,
      type: "SHOT",
    } as shotItem);
    set(setShotTrail, {
      startX: position.x,
      startY: position.y,
      x: position.x,
      y: position.y,
      index: nextShot,
    });
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

export const setExplosion = selector({
  key: "setNextExplosion",
  get: () => {},
  set: ({ get, set }, item: any) => {
    const power = get(powerBar);
    if (power < 5) {
      return;
    }
    let newExplosion = 0;
    set(lastExplosion, (num) => {
      newExplosion = num + 1;
      return num + 1;
    });
    set(
      explosionFamily(newExplosion),
      (): explosionItem => ({
        index: newExplosion,
        x: item.x,
        y: item.y,
        timer: 40,
        type: "EXPLOSION",
      })
    );
    set(activeItems, (items) => [
      ...items,
      { index: newExplosion, type: "EXPLOSION" },
    ]);
  },
});

export const getNextShotIndex = selector({
  key: "nextShot",
  get: ({ get }) => get(lastShot) + 1,
});

export const getNextExplosionIndex = selector({
  key: "nextExplosion",
  get: ({ get }) => get(lastExplosion) + 1,
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
