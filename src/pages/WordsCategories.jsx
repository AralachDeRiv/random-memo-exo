import React, { useState, useRef } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import WordsCategoriesSettingsForm from "../components/words-categories/WordsCategoriesSettingsForm";

const WordsCategories = () => {
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
        <WordsCategoriesSettingsForm
          setNumberOfQuestions={setNumberOfQuestions}
          setIsRunning={setIsRunning}
        />
      )}
    </div>
  );
};

export default WordsCategories;
