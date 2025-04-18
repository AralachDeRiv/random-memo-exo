import React from "react";
import { useState } from "react";

const CalculationAnswerCard = ({
  index,
  setIndex,
  listOfCalculations,
  setListOfCalculations,
}) => {
  const calculation = listOfCalculations[index];
  let [answer, setAnswer] = useState("");

  const submitAnswer = () => {
    setListOfCalculations((prev) => {
      const newList = [...prev];
      newList[index].userAnswer = parseInt(answer);
      newList[index].isCorrect = parseInt(answer) == calculation.result;
      return newList;
    });
    setAnswer("");
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="card w-md flex flex-col items-center gap-4">
      <h2 className="mt-2 text-2xl font-bold">{calculation.expression}</h2>

      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-24 px-3 py-2 text-xl font-semibold text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        onClick={submitAnswer}
        className="mt-2 self-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 transition"
      >
        Valider
      </button>
    </div>
  );
};

export default CalculationAnswerCard;
