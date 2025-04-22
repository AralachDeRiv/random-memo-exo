import React, { useState, useRef } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import OrientationAnswerCard from "../components/orientation/OrientationAnswerCard";
import OrientationsSettingsForm from "../components/orientation/OrientationsSettingsForm";
import OrientationsResultsCard from "../components/orientation/OrientationsResultsCard";
import Timer from "../components/Timer";

const Orientation = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);
  const endTimeRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!numberOfQuestions && !finished && (
        <OrientationsSettingsForm
          setNumberOfQuestions={setNumberOfQuestions}
          setIsRunning={setIsRunning}
        />
      )}

      {currentQuestion < numberOfQuestions && !finished && (
        <>
          <Timer
            isRunning={isRunning}
            setEndTime={(time) => (endTimeRef.current = time)}
          />

          <OrientationAnswerCard
            numberOfQuestions={numberOfQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setCorrectAnswers={setCorrectAnswers}
            setFinished={setFinished}
          />
        </>
      )}

      {finished && (
        <OrientationsResultsCard
          numberOfQuestions={numberOfQuestions}
          correctAnswers={correctAnswers}
          setNumberOfQuestions={setNumberOfQuestions}
          setCurrentQuestion={setCurrentQuestion}
          setCorrectAnswers={setCorrectAnswers}
          setFinished={setFinished}
          endTimeRef={endTimeRef}
        />
      )}
    </div>
  );
};

export default Orientation;
