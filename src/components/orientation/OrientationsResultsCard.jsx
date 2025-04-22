import React from "react";

const OrientationsResultsCard = ({
  numberOfQuestions,
  correctAnswers,
  setNumberOfQuestions,
  setCurrentQuestion,
  setCorrectAnswers,
  setFinished,
}) => {
  const handleRestart = () => {
    setNumberOfQuestions(null);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setFinished(false);
  };

  return (
    <div className="card flex flex-col items-center justify-center gap-3">
      <div className="flex gap-1">
        <p>Résultats :</p>
        <p>
          <span className="text-green-600">{correctAnswers}</span> /{" "}
          {numberOfQuestions}
        </p>
      </div>

      <button
        onClick={handleRestart}
        className="mt-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 transition"
      >
        Restart
      </button>
    </div>
  );
};

export default OrientationsResultsCard;
