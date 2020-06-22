import { useSetRecoilState } from "recoil";
import { getWidth, getHeight } from "./window.utils";
import { useEffect } from "react";
import { item, movingItems } from "../types/atom.types";
import { removeActiveItem } from "../state/selectors";

export function useIsActive(currentItem: movingItems) {
  const removeItemFromActive = useSetRecoilState(removeActiveItem);
  function calculateWidth() {
    return getWidth() + 30;
  }

  function calculateHeight() {
    return getHeight() + 30;
  }
  // If the shot goes out of bounds of the page
  // Then remove it from activeItems, this means react will not render it
  // from the activeItems atom
  useEffect(() => {
    if (
      currentItem.y > calculateHeight() ||
      currentItem.x > calculateWidth() ||
      currentItem.x < -30 ||
      currentItem.y < -30
    ) {
      // Remove reference from activeItems
      removeItemFromActive(currentItem);
      if (currentItem.type === "SHOT") {
        removeItemFromActive({
          index: currentItem.index,
          type: "SHOT_TRAIL",
        });
      } else {
        removeItemFromActive({
          index: currentItem.index,
          type: "ITEM_TRAIL",
        });
      }
    }
  }, [currentItem]);
}
