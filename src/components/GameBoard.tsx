import React, { useEffect } from "react";
import { updateItemsPositions, getHasLost } from "../state/selectors";
import { useSetRecoilState } from "recoil";
import ItemsRenderer from "./ItemsRenderer";
import { useRecoilValue } from "recoil";
import { gameSpeed } from "../state/atoms";
import GameOver from "./GameOver";

function GameBoard() {
  const render = useSetRecoilState(updateItemsPositions);
  const intervalMs = useRecoilValue(gameSpeed);
  const hasLost = useRecoilValue(getHasLost);

  useEffect(() => {
    const interval = setInterval(render, intervalMs);
    return () => {
      clearInterval(interval);
    };
  }, [intervalMs, hasLost]);

  return (
    <>
      {hasLost ? <GameOver /> : null}
      <ItemsRenderer />
    </>
  );
}

export default GameBoard;
