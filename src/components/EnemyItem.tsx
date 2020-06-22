import React from "react";
import { useRecoilValue } from "recoil";
import { itemFamily } from "../state/atoms";
import { useIsActive } from "../helpers/hooks";
import { enemyItem } from "../types/atom.types";

function EnemyItem(props: { itemKey: number }) {
  const enemyShot: enemyItem = useRecoilValue(itemFamily(props.itemKey));
  useIsActive(enemyShot);
  return (
    <div
      style={{
        position: "absolute",
        top: enemyShot.y - 2.5,
        left: enemyShot.x - 2.5,
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
