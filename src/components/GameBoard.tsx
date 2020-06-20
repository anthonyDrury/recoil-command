import React, { useEffect } from "react";
import { updateItemsPositions } from "../state/selectors";
import { useSetRecoilState } from "recoil";
import ItemsRenderer from "./ItemsRenderer";
import { useRecoilValue } from "recoil";
import { gameSpeed } from "../state/atoms";

function GameBoard() {
  const render = useSetRecoilState(updateItemsPositions);
  const intervalMs = useRecoilValue(gameSpeed);

  useEffect(() => {
    const interval = setInterval(render, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <>
      <ItemsRenderer />
    </>
  );
}

export default GameBoard;
