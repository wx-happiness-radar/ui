"use client";

import React, { useEffect, useState } from "react";
import { BG_HIGHLIGHT_BLUE, BG_XUI_BLUE } from "../colors";
import CurrentScreen from "../components/screens/CurrentScreen";
import Background from "../components/background/Background";

export default function App() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(BG_HIGHLIGHT_BLUE);
  const question = "How is your experience of this event?";
  useEffect(updateBackgroundColor, [screenIndex]);

  function nextScreen() {
    setScreenIndex(screenIndex + 1);
  }

  function previousScreen() {
    console.log("previousScreen");
    setScreenIndex(screenIndex - 1);
  }

  function updateBackgroundColor() {
    if (screenIndex === 1) {
      setBackgroundColor(BG_XUI_BLUE);
    } else {
      setBackgroundColor(BG_HIGHLIGHT_BLUE);
    }
  }

  return (
    <main>
      <Background backgroundColor={backgroundColor}>
        <CurrentScreen
          screenIndex={screenIndex}
          backgroundColor={backgroundColor}
          question={question}
          nextScreen={nextScreen}
          previousScreen={previousScreen}
        />
      </Background>
    </main>
  );
}
