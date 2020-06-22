import React from "react";
import { defenceBar } from "../state/atoms";
import { useRecoilValue } from "recoil";

function DefenceBar() {
  const defence = useRecoilValue(defenceBar);

  return (
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 0,
        height: 30,
        zIndex: 10,
        width: 300,
      }}
    >
      <div
        style={{
          backgroundColor: "blue",
          width: defence * 3,
          height: 30,
        }}
      />
    </div>
  );
}

export default DefenceBar;
