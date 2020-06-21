import React from "react";
import { playerExplosionFamily } from "../state/atoms";
import { explosionItem } from "../types/atom.types";
import { useRecoilValue } from "recoil";

function Explosion(props: { itemKey: number }) {
  const explosion: explosionItem = useRecoilValue(
    playerExplosionFamily(props.itemKey)
  );

  return (
    <div
      style={{
        position: "absolute",
        top: explosion.y,
        left: explosion.x,
        width: 30,
        height: 30,
        borderRadius: "100%",
        backgroundColor: explosion.timer & 1 ? "red" : "yellow",
      }}
    />
  );
}

export default Explosion;
