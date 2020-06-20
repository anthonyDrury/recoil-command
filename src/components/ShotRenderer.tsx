import React from "react";
import { activeItems } from "../state/atoms";
import ShotItem from "./ShotItem";
import EnemyItem from "./EnemyItem";
import { useRecoilValue } from "recoil";

function ShotRenderer() {
  const items = useRecoilValue(activeItems);

  return (
    <>
      {items.length > 0 &&
        items.map((ref) =>
          ref.type === "SHOT" ? (
            <ShotItem itemKey={ref.index} />
          ) : (
            <EnemyItem itemKey={ref.index} />
          )
        )}
    </>
  );
}

export default ShotRenderer;
