import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { setNextShot } from "../state/selectors";

function BallShooter(props: { debugMode?: boolean }) {
  const setShot = useSetRecoilState(setNextShot);
  const shooterRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /*
    Calculates the angle of the users click
    relative to the center of the BallShooter.
    This is then used to set the x and y values
    as the ball travels, with the angle controlling 
    the balls direction.
  */
  function handleShoot() {
    const preWidth =
      mousePosition.x - (shooterRef.current?.offsetLeft ?? 0) - 100;
    const veerLeft = preWidth < 0;
    const width = Math.abs(preWidth);
    const height = Math.abs(
      mousePosition.y - (shooterRef.current?.offsetTop ?? 0) - 100
    );
    const oa = height / width;
    const angle = Math.atan(oa) * (180 / Math.PI);

    if (props.debugMode) {
      console.log(`height: ${height}`);
      console.log(`width: ${width}`);
      console.log(`opp/adj: ${oa}`);
      console.log(`angle: ${angle}`);
      console.log(`veer left: ${veerLeft}`);

      console.log(`xIncrement: ${(90 - angle) / 90}`);
      console.log(`yIncrement: ${angle / 90}`);
    }
    setShot({
      x: mousePosition.x,
      y: mousePosition.y,
      xIncrement: (90 - angle) / 90,
      yIncrement: angle / 90,
      veerLeft: veerLeft,
    });
  }

  const triangleWidth = () => {
    const offset =
      mousePosition.x - (shooterRef.current?.offsetLeft ?? 0) - 100;
    return offset < 0 ? offset : 0;
  };

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    setMousePosition({ x: event.pageX, y: event.pageY });
  }

  return (
    <div
      ref={shooterRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "absolute",
        left: "calc(50% - 100px)",
        backgroundColor: "grey",
        textAlign: "center",
        width: "200px",
        height: "100px",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: "100px",
        bottom: "0",
      }}
      onClick={handleShoot}
    >
      <div
        style={{
          position: "absolute",
          maxHeight: "200px",
          maxWidth: "200px",
          backgroundColor: props.debugMode ? "blue" : "",
          bottom: 0,
          height: Math.abs(
            mousePosition.y - (shooterRef.current?.offsetTop ?? 0) - 100
          ),
          width: Math.abs(
            mousePosition.x - (shooterRef.current?.offsetLeft ?? 0) - 100
          ),
          left: `calc(50% + ${triangleWidth()}px)`,
          zIndex: 100,
        }}
      ></div>
    </div>
  );
}

export default BallShooter;
