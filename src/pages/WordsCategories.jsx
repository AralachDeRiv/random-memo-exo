import React, { useState, useRef, useEffect } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import WordsCategoriesSettingsForm from "../components/words-categories/WordsCategoriesSettingsForm";
import WordsCategoriesAnswerCard from "../components/words-categories/WordsCategoriesAnswerCard";
import Timer from "../components/Timer";

const WordsCategories = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);
  const endTimeRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    console.log("currentQuestion", currentQuestion);
    console.log("numberOfQuestions", numberOfQuestions);
    console.log("correctAnswers", correctAnswers);
  }, [currentQuestion, numberOfQuestions, correctAnswers]);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!numberOfQuestions && !finished && (
        <WordsCategoriesSettingsForm
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

          <WordsCategoriesAnswerCard
            numberOfQuestions={numberOfQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            setCorrectAnswers={setCorrectAnswers}
            setFinished={setFinished}
          />
        </>
      )}
    </div>
  );
};

export default WordsCategories;
