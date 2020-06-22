import React from "react";
import { explosionFamily } from "../state/atoms";
import { explosionItem } from "../types/atom.types";
import { useRecoilValue } from "recoil";
import { getExplosionSize } from "../helpers/window.utils";

function Explosion(props: { itemKey: number }) {
  const explosion: explosionItem = useRecoilValue(
    explosionFamily(props.itemKey)
  );
  const size = getExplosionSize(explosion.timer);
  return (
    <>
      {explosion.timer <= 30 && (
        <div
          style={{
            position: "absolute",
            top: explosion.y - size / 2,
            left: explosion.x - size / 2,
            width: size,
            height: size,
            borderRadius: "100%",
            backgroundColor: explosion.timer & 1 ? "red" : "yellow",
          }}
        />
      )}
    </>
  );
}

export default Explosion;
