import React, { useState, useEffect } from "react";
import CenterContent from "./ContentGroup";
import Header from "../Header";
import { BackButtonInvert, BadOptionButton } from "../Button";

export default function Feedback({ question, previousScreen }) {
  const [selectedSmileyName, setSelectedSmileyName] = useState(null);
  const [isShowingBadReasonOptions, setIsShowingBadReasonOptions] =
    useState(false);
  const [isShowingThanks, setIsShowingThanks] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    // Get the user's location when the component mounts
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setLatitude(latitude); // Save latitude to state
        setLongitude(longitude); // Save longitude to state
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures this effect runs once on mount

  async function submitFeedback(
    question,
    smileyName,
    selectedBadReason,
    lat,
    long
  ) {
    console.log(
      "Submitting:",
      question,
      smileyName,
      selectedBadReason,
      lat,
      long
    );
    var url = `https://docs.google.com/forms/d/e/1FAIpQLSeKBFCPZOkzMRtOudAK-91NzKm8OiAnnlnQDC8zNMJ-oJqSFw/formResponse?&submit=Submit&entry.881971892=${question}&entry.851806253=${smileyName}&entry.200176182=${lat}&entry.653180322=${long}`;
    if (smileyName == "bad") {
      url = url + `&entry.1608401455=${selectedBadReason}`; // add bad reason to url, only if bad smiley was selected
    }
    await fetch(url, { mode: "no-cors" });

    setIsShowingThanks(true);
    // short delay to read the thank-you message
    setTimeout(() => {
      resetFeedback();
    }, 1000);
  }

  function resetFeedback() {
    // reset the page for the next response
    setSelectedSmileyName(null);
    setIsShowingThanks(false);
  }

  async function smileyClickHandler(smileyName) {
    if (selectedSmileyName != null) {
      return; // only submit one smiley at a time
    } else {
      setSelectedSmileyName(smileyName);

      if (smileyName == "bad") {
        setIsShowingBadReasonOptions(true);
      } else {
        submitFeedback(question, smileyName, null, latitude, longitude);
      }
    }
  }

  function BadReasonOptions({ visible }) {
    const badReasonOptions = [
      "Overcrowded atmosphere",
      "Disliked food options provided",
      "Not enough dietary catering",
      "Music didn't match my vibe",
    ];

    function onClick(badReasonOption) {
      submitFeedback(question, "bad", badReasonOption, latitude, longitude);
      setIsShowingBadReasonOptions(false);
    }

    return (
      <div
        className={`relative flex flex-row justify-center w-full h-full ${
          !visible && "hidden"
        }
       flex flex-row space-x-4 rounded-full`}
      >
        {badReasonOptions.map((badReasonOption) => (
          <BadOptionButton
            key={badReasonOption} // Don't forget to add a unique key when mapping over an array
            onClick={() => onClick(badReasonOption)}
          >
            {badReasonOption}
          </BadOptionButton>
        ))}
      </div>
    );
  }

  const allSmileyNames = ["bad", "neutral", "good"];
  const smileys = allSmileyNames.map((smileyName) => (
    <Smiley
      key={smileyName}
      smileyName={smileyName}
      currentlySelectedSmileyName={selectedSmileyName}
      onClick={() => smileyClickHandler(smileyName, allSmileyNames)}
    />
  ));

  return (
    <CenterContent>
      <div className="h-1/5">
        <BackButtonInvert onClick={previousScreen}></BackButtonInvert>
      </div>
      <div className="flex flex-col space-y-4">
        <Header color="text-white">{question}</Header>
        <div className="w-full bg-white rounded-3xl p-2 sm:p-8 flex flex-row space-x-4 relative">
          {smileys}
        </div>
        <div className="h-16">
          <BadReasonOptions visible={isShowingBadReasonOptions} />
          <Thanks visible={isShowingThanks} />
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="space-y-2">
          <div className="text-white w-full text-center">
            Provide more feedback
          </div>
          <img
            src="additional-feedback-qr-code.svg"
            className="max-w-[200px] rounded"
          />
        </div>
      </div>
    </CenterContent>
  );
}

function Smiley({ smileyName, onClick, currentlySelectedSmileyName }) {
  return (
    <div>
      <img
        src={`smileys/${smileyName}.png`}
        alt={smileyName}
        className={`flex-1 ${
          currentlySelectedSmileyName == smileyName
            ? "opacity-100 scale-125"
            : "opacity-80 scale-100"
        }`}
        onClick={onClick}
      />
    </div>
  );
}

function Thanks({ visible }) {
  return (
    <div
      className={`relative flex flex-row justify-center w-full h-full ${
        !visible && "hidden"
      }`}
    >
      <div className="bg-sky-300 bg-opacity-50 rounded-full px-3 py-1 flex items-center justify-center">
        <div className="text-2xl text-white">
          🎉 Thanks for your feedback! 🎉
        </div>
      </div>
    </div>
  );
}
