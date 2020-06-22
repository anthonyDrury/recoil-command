import {
  itemReference,
  items,
  movingItems,
  shotItem,
  explosionItem,
  enemyItem,
} from "../types/atom.types";
import { getHeight, getExplosionSize } from "./window.utils";

// Calculates the new positions
// Taking into consideration it can only move minimum 1px
export function calculateNextItemState(item: movingItems) {
  return {
    ...item,
    x: item.veerLeft
      ? item.x - 5 * item.xIncrement
      : item.x + 5 * item.xIncrement,
    y: item.y - 5 * item.yIncrement,
  };
}

export function isSameItem(x: items | itemReference, y: items | itemReference) {
  return x.type === y.type && x.index === y.index;
}

//
export function isSameItemOrTrailFor(
  x: items | itemReference,
  y: items | itemReference
) {
  return (
    (x.type === y.type ||
      (x.type === "ITEM_TRAIL" && y.type === "ITEM") ||
      (x.type === "ITEM" && y.type === "ITEM_TRAIL")) &&
    x.index === y.index
  );
}

// checks if player shot has hit target
function hasHitTarget(a: shotItem) {
  const xRange = a.x - a.target.x;
  const yRange = a.y - a.target.y;
  const isXInRange =
    (xRange < 0 && xRange > -50) || (xRange > 0 && xRange < 50);
  const isYInRange =
    (yRange < 0 && yRange > -50) || (yRange > 0 && yRange < 50);
  return isXInRange && isYInRange;
}

// checks if enemyShot has collided with explosion
function hasCollided(a: enemyItem, b: explosionItem) {
  // Delay before explosion is 'active'
  if (b.timer > 30) {
    return false;
  }
  const diameter = getExplosionSize(b.timer) / 2;
  const negativeDiameter = -Math.abs(diameter);
  const xRange = a.x - b.x;
  const yRange = a.y - b.y;
  const isXInRange =
    (xRange < 0 && xRange > negativeDiameter) ||
    (xRange > 0 && xRange < diameter);
  const isYInRange =
    (yRange < 0 && yRange > negativeDiameter) ||
    (yRange > 0 && yRange < diameter);
  return isXInRange && isYInRange;
}

function hasHitDefence(item: items) {
  if (item.type === "ITEM") {
    const height = getHeight() - 15;
    return item.y >= height;
  }
  return false;
}

// determine if items have hit the defence, or their target
// if so remove them from active list and set collisions
export function determineCollisions(items: Array<movingItems | explosionItem>) {
  const targetCollisions: Map<string, itemReference> = new Map();
  const defenceCollisions: Map<string, itemReference> = new Map();
  const missileCollisions: Map<string, itemReference> = new Map();
  const newStates: Array<movingItems | explosionItem> = [];
  const explosions: explosionItem[] = [];
  let isDefenceHit: boolean = false;

  // Calculate new states
  items.forEach((item) => {
    if (item.type !== "EXPLOSION") {
      newStates.push(calculateNextItemState(item));
    } else {
      explosions.push(item);
      newStates.push(item);
    }
  });

  newStates.forEach((item) => {
    let explosionCollided: boolean = false;

    if (item.type === "SHOT" && hasHitTarget(item)) {
      targetCollisions.set(`${item.type}_${item.index}`, item);
    } else if (item.type === "ITEM") {
      explosionCollided =
        explosions.filter((explosion) => hasCollided(item, explosion)).length >
        0;
      if (explosionCollided) {
        missileCollisions.set(`${item.type}_${item.index}`, item);
      }
      if (hasHitDefence(item)) {
        defenceCollisions.set(`${item.type}_${item.index}`, item);
        isDefenceHit = true;
      }
    }
  });
  return {
    targetCollisions,
    defenceCollisions,
    missileCollisions,
    newStates,
    isDefenceHit,
  };
}
