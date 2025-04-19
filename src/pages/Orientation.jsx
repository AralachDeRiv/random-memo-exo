import React, { useState } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import OrientationsSettingsForm from "../components/orientation/OrientationsSettingsForm";
import OrientationAnswerCard from "../components/orientation/OrientationAnswerCard";

const Orientation = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [listOfResults, setListOfResults] = useState([]);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!numberOfQuestions && (
        <OrientationsSettingsForm setNumberOfQuestions={setNumberOfQuestions} />
      )}

      {numberOfQuestions <= 1 && listOfResults.length <= numberOfQuestions && (
        <OrientationAnswerCard
          numberOfQuestions={numberOfQuestions}
          listOfResults={listOfResults}
          setListOfResults={setListOfResults}
        />
      )}
    </div>
  );
};

export default Orientation;
