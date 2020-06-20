import { useSetRecoilState } from "recoil";
import { activeItems } from "../state/atoms";
import { getWidth, getHeight } from "./window.utils";
import { useEffect } from "react";
import { item } from "../types/atom.types";

export function useIsActive(currentItem: item) {
  const setIsActive = useSetRecoilState(activeItems);
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
      setIsActive((activeItems) => {
        return activeItems.filter((item) => {
          return !(
            item.type === currentItem.type && item.index === currentItem.index
          );
        });
      });
    }
  }, [currentItem]);
}
