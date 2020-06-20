import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { setEnemyShot } from "../state/selectors";
import { enemyLevel } from "../state/atoms";
import { getWidth } from "../helpers/window.utils";

function EnemyShooter() {
  const setShot = useSetRecoilState(setEnemyShot);
  const level = useRecoilValue(enemyLevel);

  useEffect(() => {
    const interval = setInterval(handleEnemyShoot, 10);
    return () => clearInterval(interval);
  }, [level]);

  function handleEnemyShoot() {
    const random = Math.random();
    if (random < level) {
      setShot({
        y: 0,
        x: Math.floor(Math.random() * getWidth()),
        xIncrement: Math.random(),
        yIncrement: -Math.abs(Math.random()),
        veerLeft: Math.random() > 0.5,
      });
    }
  }

  return <></>;
}

export default EnemyShooter;
