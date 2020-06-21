import React from "react";
import { enemyLevel } from "../state/atoms";
import { useRecoilValue } from "recoil";

function EnemyLevel() {
  const level = useRecoilValue(enemyLevel);

  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        right: 0,
        zIndex: 10,
        fontSize: "3rem",
      }}
    >
      Level {Math.round(level * 100)}
    </div>
  );
}

export default EnemyLevel;
