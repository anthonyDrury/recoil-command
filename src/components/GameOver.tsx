import React from "react";
import { useRecoilValue } from "recoil";
import { points } from "../state/atoms";

function GameOver() {
  const pointTally = useRecoilValue(points);
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.1)",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 200,
          height: 150,
          textAlign: "center",
          backgroundColor: "white",
          margin: "0 auto",
          borderRadius: 15,
          zIndex: 15,
        }}
      >
        <h2>You did your best!</h2>
        <p>Your points total was: {pointTally}</p>
      </div>
    </div>
  );
}

export default GameOver;