import React from "react";
import { useRecoilState } from "recoil";
import { activeItems } from "../state/atoms";
import BallShooter from "./BallShooter";
import ShotItem from "./ShotItem";
import EnemyItem from "./EnemyItem";

function ItemsRenderer() {
  const [items] = useRecoilState(activeItems);

  return (
    <>
      {items.map((ref) =>
        ref.type === "ITEM" ? (
          <EnemyItem itemKey={ref.index} />
        ) : (
          <ShotItem itemKey={ref.index} />
        )
      )}
      <BallShooter />
    </>
  );
}

export default ItemsRenderer;
