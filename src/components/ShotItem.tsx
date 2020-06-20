import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { shotFamily, activeItems } from "../state/atoms";
import { useSetRecoilState } from "recoil";

function ShotItem(props: { itemKey: string }) {
  const item = useRecoilValue(shotFamily(props.itemKey));
  const setIsActive = useSetRecoilState(activeItems);

  // If the shot goes out of bounds of the page
  // Then remove it from activeItems, this means react will not render it
  // from the activeItems atom
  useEffect(() => {
    if (
      item.y > getHeight() ||
      item.x > getWidth() ||
      item.x < -30 ||
      item.y < -30
    ) {
      setIsActive((activeItems) => {
        return activeItems.filter(
          (item) => !(item.type === "SHOT" && item.index === props.itemKey)
        );
      });
    }
  }, [item]);

  function getWidth() {
    return (
      Math.max(window.innerWidth, document.documentElement.clientWidth) + 30
    );
  }

  function getHeight() {
    return (
      Math.max(window.innerHeight, document.documentElement.clientHeight) + 30
    );
  }

  useEffect(() => {
    console.log("update shot");
  }, [item]);

  return (
    <div
      style={{
        position: "absolute",
        top: item.y,
        left: item.x,
        zIndex: 200,
        backgroundColor: "blue",
        width: 30,
        height: 30,
        borderRadius: 15,
      }}
    />
  );
}

export default ShotItem;
