import React, { useState } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import OrientationsSettingsForm from "../components/orientation/OrientationsSettingsForm";

// const directionToDegrees = {
//   "up-right": 45,
//   "up-left": 315,
//   "down-right": 135,
//   "down-left": 225,
// };

const Orientation = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!numberOfQuestions && (
        <OrientationsSettingsForm setNumberOfQuestions={setNumberOfQuestions} />
      )}
    </div>
  );
};

export default Orientation;
