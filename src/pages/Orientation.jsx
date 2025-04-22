import React, { useState } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import OrientationsSettingsForm from "../components/orientation/OrientationsSettingsForm";
import OrientationAnswerCard from "../components/orientation/OrientationAnswerCard";

const Orientation = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [finished, setFinished] = useState(false);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!numberOfQuestions && !finished && (
        <OrientationsSettingsForm setNumberOfQuestions={setNumberOfQuestions} />
      )}

      {numberOfQuestions >= 1 && (
        <OrientationAnswerCard
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          setFinished={setFinished}
        />
      )}
    </div>
  );
};

export default Orientation;
