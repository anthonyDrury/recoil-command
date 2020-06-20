import { useSetRecoilState } from "recoil";
import { getWidth, getHeight } from "./window.utils";
import { useEffect } from "react";
import { item } from "../types/atom.types";
import { removeActiveItem } from "../state/selectors";

export function useIsActive(currentItem: item) {
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
    }
  }, [currentItem]);
}
