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
    // <div
    //   style={{
    //     top: shotTrail.y,
    //     left: shotTrail.x,
    //     zIndex: 8,
    //     backgroundColor: "red",
    //     width: 1,
    //     height: 1,
    //     borderRadius: 1,
    //   }}
    // />
  );
}

export default EnemyItemTrail;
