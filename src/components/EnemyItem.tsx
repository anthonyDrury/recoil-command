import React from "react";
import { useRecoilValue } from "recoil";
import { itemFamily } from "../state/atoms";

function EnemyItem(props: { itemKey: string }) {
  const item = useRecoilValue(itemFamily(props.itemKey));

  return (
    <div
      style={{
        position: "absolute",
        top: item.y,
        left: item.x,
        zIndex: 200,
      }}
    >
      {"Watch me go"}
    </div>
  );
}

export default EnemyItem;
