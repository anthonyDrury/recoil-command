import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { setNextShot, getHasLost } from "../state/selectors";
import { useRecoilValue } from "recoil";

function BallShooter(props: { debugMode?: boolean }) {
  const setShot = useSetRecoilState(setNextShot);
  const shooterRef = useRef<HTMLDivElement | null>(null);
  const hasLost = useRecoilValue(getHasLost);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /*
    Calculates the angle of the users click
    relative to the center of the BallShooter.
    This is then used to set the x and y values
    as the ball travels, with the angle controlling 
    the balls direction.
  */
  function handleShoot() {
    if (hasLost) {
      return;
    }
    const preWidth =
      mousePosition.x - (shooterRef.current?.getBoundingClientRect().left ?? 0);
    const veerLeft = preWidth < 0;
    const width = Math.abs(preWidth);
    const height = Math.abs(
      mousePosition.y - (shooterRef.current?.getBoundingClientRect().top ?? 0)
    );
    const oa = height / width;
    const angle = Math.atan(oa) * (180 / Math.PI);

    const newWidth = 100 * Math.sin(angle);
    const newHeight = Math.sqrt(Math.pow(100, 2) - Math.pow(newWidth, 2));

    console.log(newWidth);
    console.log(newHeight);

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
      x: shooterRef.current?.getBoundingClientRect().left ?? 0,
      y: shooterRef.current?.getBoundingClientRect().top ?? 0,
      xIncrement: ((90 - angle) / 90) * 4,
      yIncrement: (angle / 90) * 4,
      veerLeft: veerLeft,
      target: {
        x: mousePosition.x,
        y: mousePosition.y,
      },
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
      style={{
        zIndex: 20,
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      onMouseMove={handleMouseMove}
      onClick={handleShoot}
    >
      <div
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
          zIndex: 1,
        }}
      >
        <div
          ref={shooterRef}
          style={{
            position: "absolute",
            bottom: 100,
            right: 100,
          }}
        />
        {props.debugMode ? (
          <div
            style={{
              position: "absolute",
              backgroundColor: "blue",
              bottom: 100,
              height: Math.abs(
                mousePosition.y -
                  (shooterRef.current?.getBoundingClientRect().top ?? 0)
              ),
              width: Math.abs(
                mousePosition.x -
                  (shooterRef.current?.getBoundingClientRect().left ?? 0)
              ),
              left: `calc(50% + ${triangleWidth()}px)`,
              zIndex: 100,
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
}

export default BallShooter;
