import React from "react";
import BallShooter from "./BallShooter";
import EnemyShooter from "./EnemyShooter";
import ShotRenderer from "./ShotRenderer";
import DefenceRange from "./DefenceRange";
import PowerBar from "./PowerBar";
import DefenceBar from "./DefenceBar";

function ItemsRenderer() {
  return (
    <>
      <EnemyShooter />
      <PowerBar />
      <DefenceBar />
      <ShotRenderer />
      <BallShooter />
      <DefenceRange />
    </>
  );
}

export default ItemsRenderer;
