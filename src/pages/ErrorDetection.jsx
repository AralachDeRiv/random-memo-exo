import React, { useState, useRef } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import DetectionSettingsForm from "../components/detection/DetectionSettingsForm";
import Timer from "../components/Timer";
import DetectionAnswerCard from "../components/detection/DetectionAnswerCard";
import DetectionsResultsCard from "../components/detection/DetectionsResultsCard";

const ErrorDetection = () => {
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
        <DetectionSettingsForm
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

          <DetectionAnswerCard
            numberOfQuestions={numberOfQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setCorrectAnswers={setCorrectAnswers}
            setFinished={setFinished}
          />
        </>
      )}

      {finished && (
        <DetectionsResultsCard
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

export default ErrorDetection;
