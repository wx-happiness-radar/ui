import React from "react";

function BackgroundImage({ x, y, source }) {
  return (
    <div className={`absolute ${x} ${y} opacity-60`}>
      <img
        src={source}
        className="h-[500px] w-[500px]"
        alt="Meaningless image to make the background look nice."
      />
    </div>
  );
}

export function XSO({ x, y }) {
  return BackgroundImage({ x, y, source: "background/XSO.png" });
}

export function XSO_2({ x, y }) {
  return BackgroundImage({ x, y, source: "background/XSO_2.png" });
}
