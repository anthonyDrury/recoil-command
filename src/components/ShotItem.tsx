import React from "react";
import { useRecoilValue } from "recoil";
import { shotFamily } from "../state/atoms";
import { useIsActive } from "../helpers/hooks";
import { shotItem } from "../types/atom.types";

function ShotItem(props: { itemKey: number }) {
  const shot: shotItem = useRecoilValue(shotFamily(props.itemKey));
  useIsActive(shot);
  return (
    <div
      style={{
        position: "absolute",
        top: shot.y - 2.5,
        left: shot.x - 2.5,
        zIndex: 9,
        backgroundColor: "red",
        width: 5,
        height: 5,
        borderRadius: "100%",
      }}
    />
  );
}

export default ShotItem;
