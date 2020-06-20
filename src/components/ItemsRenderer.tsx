import React from "react";
import { useRecoilState } from "recoil";
import { activeItems } from "../state/atoms";
import BallShooter from "./BallShooter";
import ShotItem from "./ShotItem";
import EnemyItem from "./EnemyItem";
import EnemyShooter from "./EnemyShooter";

function ItemsRenderer() {
  const [items] = useRecoilState(activeItems);

  return (
    <>
      <EnemyShooter />
      {items.map((ref) =>
        ref.type === "SHOT" ? (
          <ShotItem itemKey={ref.index} />
        ) : (
          <EnemyItem itemKey={ref.index} />
        )
      )}
      <BallShooter />
    </>
  );
}

export default ItemsRenderer;
