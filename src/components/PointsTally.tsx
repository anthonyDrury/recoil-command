import React from "react";
import { points } from "../state/atoms";
import { useRecoilValue } from "recoil";

function PointsTally() {
  const pointValue = useRecoilValue(points);

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 0,
        zIndex: 10,
        fontSize: "3rem",
      }}
    >
      {pointValue} Points
    </div>
  );
}

export default PointsTally;
