import React from "react";
import { Tooltip } from "antd";

export function renderTooltip(title, jsx) {
  return (
    <Tooltip placement="topLeft" title={title}>
      {jsx}
    </Tooltip>
  );
}
