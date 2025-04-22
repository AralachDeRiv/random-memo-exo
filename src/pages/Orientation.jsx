import React, { useState } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import OrientationAnswerCard from "../components/orientation/OrientationAnswerCard";
import OrientationsSettingsForm from "../components/orientation/OrientationsSettingsForm";
import OrientationsResultsCard from "../components/orientation/OrientationsResultsCard";

const Orientation = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!numberOfQuestions && !finished && (
        <OrientationsSettingsForm setNumberOfQuestions={setNumberOfQuestions} />
      )}

      {currentQuestion < numberOfQuestions && !finished && (
        <OrientationAnswerCard
          numberOfQuestions={numberOfQuestions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          setCorrectAnswers={setCorrectAnswers}
          setFinished={setFinished}
        />
      )}

      {finished && (
        <OrientationsResultsCard
          numberOfQuestions={numberOfQuestions}
          correctAnswers={correctAnswers}
          setNumberOfQuestions={setNumberOfQuestions}
          setCurrentQuestion={setCurrentQuestion}
          setCorrectAnswers={setCorrectAnswers}
          setFinished={setFinished}
        />
      )}
    </div>
  );
};

export default Orientation;
