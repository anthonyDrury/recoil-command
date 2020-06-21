import React from "react";
import { useRecoilValue } from "recoil";
import { itemFamily } from "../state/atoms";
import { useIsActive } from "../helpers/hooks";
import { item } from "../types/atom.types";

function EnemyItem(props: { itemKey: number }) {
  const enemyShot: item = useRecoilValue(itemFamily(props.itemKey));
  useIsActive(enemyShot);

  return (
    <div
      style={{
        position: "absolute",
        top: enemyShot.y,
        left: enemyShot.x,
        zIndex: 9,
        backgroundColor: "black",
        width: 5,
        height: 5,
        borderRadius: "100%",
      }}
    />
  );
}

export default EnemyItem;
