import React, { useState, useEffect } from "react";
import CenterContent from "./ContentGroup";
import Header from "../Header";
import { BackButtonInvert, BadOptionButton, PrimaryButton } from "../Button";

export default function Feedback({ question, previousScreen }) {
  const [selectedSmileyName, setSelectedSmileyName] = useState(null);
  const [isShowingBadReasonOptions, setIsShowingBadReasonOptions] =
    useState(false);
  const [isShowingThanks, setIsShowingThanks] = useState(false);
  const [isShowingLocationError, setIsShowingLocationError] = useState(false);
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
        setIsShowingLocationError(true);
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
    function getCurrentDate() {
      const today = new Date();

      const dd = String(today.getDate()).padStart(2, "0"); // Get the day and pad with leading zero if necessary
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // Get the month (add 1 because months are zero-based) and pad with leading zero if necessary
      const yyyy = today.getFullYear(); // Get the full year

      return dd + "/" + mm + "/" + yyyy; // Format the date as dd/mm/yyyy
    }

    const formattedDate = getCurrentDate();
    console.log(
      "Submitting:",
      formattedDate,
      question,
      smileyName,
      selectedBadReason,
      lat,
      long
    );
    var url = `https://docs.google.com/forms/d/e/1FAIpQLSeKBFCPZOkzMRtOudAK-91NzKm8OiAnnlnQDC8zNMJ-oJqSFw/formResponse?&submit=Submit&entry.881971892=${question}&entry.851806253=${smileyName}&entry.200176182=${lat}&entry.653180322=${long}&entry.1608401455=${selectedBadReason}&entry.1379176844=${formattedDate}`;
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

      if (smileyName == "frown") {
        setIsShowingBadReasonOptions(true);
      } else {
        submitFeedback(question, smileyName, "N/A", latitude, longitude);
      }
    }
  }

  function BadReasonOptions({ visible }) {
    const badReasonOptions = [
      "Overcrowded atmosphere",
      "Disliked food options provided",
      "Not enough dietary catering",
      "Music didn't match my vibe",
      "Other",
    ];

    if (visible) {
      // Automatically submit no response if option not selected.
      var autoSubmit = setTimeout(noResponse, 10000);
    }

    function noResponse() {
      submitFeedback(question, "frown", "No Response", latitude, longitude);
      setIsShowingBadReasonOptions(false);
    }

    function onClick(badReasonOption) {
      clearTimeout(autoSubmit); // Cancel the no response submission
      submitFeedback(question, "frown", badReasonOption, latitude, longitude);
      setIsShowingBadReasonOptions(false);
    }

    return (
      <div
        className={`relative flex flex-row justify-center w-full h-full ${
          !visible && "opacity-0"
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

  const allSmileyNames = ["frown", "neutral", "smile"];
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
      {isShowingLocationError ? (
        <div className="h-full w-full flex flex-col justify-center">
          <div className="w-full h-fit  bg-white rounded-3xl p-2 sm:p-8 flex flex-col space-y-4 relative">
            <Header color="text-black">
              There was an error accessing the device location.
            </Header>
            <span className="text-center">
              Please enable location services in the device settings, and in the
              browser, then refresh the page.
            </span>
            <PrimaryButton
              onClick={() => {
                location.reload();
              }}
            >
              Reload Page
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <>
          <div className="">
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
        </>
      )}
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
