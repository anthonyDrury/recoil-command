import React from "react";
import { defenceHit } from "../state/atoms";
import { useRecoilValue } from "recoil";

function DefenceRange() {
  const isHit = useRecoilValue(defenceHit);

  return (
    <div
      style={{
        backgroundColor: isHit ? "red" : "blue",
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: 30,
      }}
    />
  );
}

export default DefenceRange;
