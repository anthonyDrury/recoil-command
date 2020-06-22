import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { setEnemyShot, getHasLost } from "../state/selectors";
import { enemyLevel } from "../state/atoms";
import { getWidth } from "../helpers/window.utils";

function EnemyShooter() {
  const setShot = useSetRecoilState(setEnemyShot);
  const level = useRecoilValue(enemyLevel);
  const hasLost = useRecoilValue(getHasLost);

  useEffect(() => {
    const interval = setInterval(handleEnemyShoot, 10);
    return () => clearInterval(interval);
  }, [level, hasLost]);

  function handleEnemyShoot() {
    if (hasLost) {
      return;
    }
    const random = Math.random();
    if (random < level) {
      const width = getWidth();
      setShot({
        y: 0,
        x: Math.floor(Math.random() * width),
        // Larger the screen width the larger xIncrement can be
        xIncrement: Math.random() * (0.1 * (width / 192)),
        yIncrement: -Math.abs(Math.random()),
        xCount: 0,
        yCount: 0,
        veerLeft: Math.random() > 0.5,
      });
    }
  }

  return <></>;
}

export default EnemyShooter;
