import React from "react";
import { useRecoilValue } from "recoil";
import { shotFamily } from "../state/atoms";
import { useIsActive } from "../helpers/hooks";
import { item } from "../types/atom.types";

function ShotItem(props: { itemKey: number }) {
  const shot: item = useRecoilValue(shotFamily(props.itemKey));
  useIsActive(shot);

  return (
    <div
      style={{
        position: "absolute",
        top: shot.y,
        left: shot.x,
        zIndex: 9,
        backgroundColor: "blue",
        width: 5,
        height: 5,
        borderRadius: "100%",
      }}
    />
  );
}

export default ShotItem;
