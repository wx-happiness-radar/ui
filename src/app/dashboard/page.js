"use client";

import React, { useEffect, useState } from "react";
import { BG_XUI_BLUE } from "../../colors";
import Background from "../../components/background/Background";

export default function App() {
  const backgroundColor = BG_XUI_BLUE;

  return (
    <main>
      <Background backgroundColor={backgroundColor}>Hello</Background>
    </main>
  );
}
