import React from "react";

type PreGameProps = {
  onStart: () => void;
};
function PreGame(props: PreGameProps) {
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
          width: 300,
          padding: "10px",
          textAlign: "center",
          backgroundColor: "white",
          margin: "0 auto",
          borderRadius: 15,
          zIndex: 15,
        }}
      >
        <h1>Protectorb</h1>
        <p>A missile command tribute.</p>
        <p>Destroy the missiles before they hit your blue base.</p>
        <p>
          When a missile hits your defender line you will permanently lose
          defence points from your blue defender bar (top right).
        </p>
        <p>If your defender bar runs out, game over.</p>
        <button onClick={props.onStart}>Start Game</button>
      </div>
    </div>
  );
}

export default PreGame;
