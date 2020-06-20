import React from "react";

function If(props: { condition: boolean; children: JSX.Element }) {
  return props.condition ? props.children : null;
}

export default If;
