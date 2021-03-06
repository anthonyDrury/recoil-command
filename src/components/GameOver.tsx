import React from "react";
import { useRecoilValue } from "recoil";
import { points } from "../state/atoms";
import { getReadableLevel } from "../state/selectors";

function GameOver() {
  const pointTally = useRecoilValue(points);
  const level = useRecoilValue(getReadableLevel);
  function reload() {
    window.location.reload();
  }
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
          textAlign: "center",
          backgroundColor: "white",
          margin: "0 auto",
          paddingBottom: "1rem",
          borderRadius: 15,
          zIndex: 15,
        }}
      >
        <h2>You did your best!</h2>
        <p>Your points total was: {pointTally}</p>
        <p>You got up to level: {level}</p>
        <button onClick={reload}>Play Again</button>
      </div>
    </div>
  );
}

export default GameOver;
