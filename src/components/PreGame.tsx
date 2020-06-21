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
        <p>Click the grey semi-circle to shoot.</p>
        <p>
          Hit the red orbs before they hit your blue defender line at the
          bottom. Doing so will get you 1 point per red orb hit.
        </p>
        <p>
          Each time you shoot it drains your yellow power bar. It goes up slowly
          over time and even more if you hit a red orb.
        </p>
        <p>
          When a red orb hits your defender line you will permanently lose
          defence points from your blue defender bar.
        </p>
        <p>If your defender bar runs out, game over.</p>
        <button onClick={props.onStart}>Start Game</button>
      </div>
    </div>
  );
}

export default PreGame;
