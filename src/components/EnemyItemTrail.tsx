import React from "react";
import { itemTrailFamily } from "../state/atoms";
import { itemTrail } from "../types/atom.types";
import { useRecoilValue } from "recoil";

function EnemyItemTrail(props: { itemKey: number }) {
  const shotTrail: itemTrail = useRecoilValue(itemTrailFamily(props.itemKey));

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
      }}
    >
      <line
        x1={shotTrail.startX}
        y1={shotTrail.startY}
        x2={shotTrail.x}
        y2={shotTrail.y}
        stroke="red"
      />
    </svg>
  );
}

export default EnemyItemTrail;
