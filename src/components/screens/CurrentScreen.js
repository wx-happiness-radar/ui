import LandingScreen from "./Landing";
import Feedback from "./Feedback";
import Exit from "./Exit";

export default function CurrentScreen({
  screenIndex,
  nextScreen,
  previousScreen,
  question,
}) {
  var screens = [
    <LandingScreen key="landing" nextScreen={nextScreen} />,
    <Feedback
      key="feedback"
      nextScreen={nextScreen}
      question={question}
      previousScreen={previousScreen}
    />,
    <Exit key="exit" nextScreen={nextScreen} />,
  ];
  var component = screens[screenIndex];

  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-16">
      {component}
    </div>
  );
}
