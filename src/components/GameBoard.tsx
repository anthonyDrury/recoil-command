import React, { useEffect } from "react";
import { updateItemsPositions } from "../state/selectors";
import { useSetRecoilState } from "recoil";
import ItemsRenderer from "./ItemsRenderer";
import { useRecoilValue } from "recoil";
import { gameSpeed } from "../state/atoms";

function GameBoard() {
  const setItem = useSetRecoilState(updateItemsPositions);
  const intervalMs = useRecoilValue(gameSpeed);

  useEffect(() => {
    const interval = setInterval(setItem, intervalMs);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ItemsRenderer />
    </>
  );
}

export default GameBoard;
