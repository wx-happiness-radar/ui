import React from "react";
import { XSO, XSO_2 } from "./BackgroundImage";

export default function Background({ backgroundColor, children }) {
  return (
    <div className={`h-screen w-screen fixed ${backgroundColor}`}>
      <XSO x="right-[-65px]" y="top-[-20px]" />
      <XSO_2 x="left-[-30px]" y="bottom-[-35px]" />
      {children}
    </div>
  );
}
