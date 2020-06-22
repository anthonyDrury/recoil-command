import React from "react";
import { useRecoilValue } from "recoil";
import { getReadableLevel } from "../state/selectors";

function EnemyLevel() {
  const level = useRecoilValue(getReadableLevel);

  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        right: 0,
        zIndex: 10,
        fontSize: "3rem",
      }}
    >
      Level {level}
    </div>
  );
}

export default EnemyLevel;
