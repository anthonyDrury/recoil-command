import React from "react";
import { powerBar } from "../state/atoms";
import { useRecoilValue } from "recoil";

function PowerBar() {
  const power = useRecoilValue(powerBar);

  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        height: 30,
        zIndex: 10,
        width: 300,
        border: "1px solid black",
      }}
    >
      <div
        style={{
          backgroundColor: "yellow",
          width: power * 3,
          height: 30,
        }}
      />
    </div>
  );
}

export default PowerBar;
