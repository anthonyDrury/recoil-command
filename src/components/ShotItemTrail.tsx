import React from "react";
import { shotTrailFamily } from "../state/atoms";
import { shotTrail } from "../types/atom.types";
import { useRecoilValue } from "recoil";

function ShotItemTrail(props: { itemKey: number }) {
  const trail: shotTrail = useRecoilValue(shotTrailFamily(props.itemKey));

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
      }}
    >
      <line
        x1={trail.startX}
        y1={trail.startY}
        x2={trail.x}
        y2={trail.y}
        stroke="green"
      />
    </svg>
  );
}

export default ShotItemTrail;
