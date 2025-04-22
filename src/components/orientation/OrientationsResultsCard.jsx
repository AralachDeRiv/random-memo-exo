import React from "react";

const OrientationsResultsCard = ({
  numberOfQuestions,
  correctAnswers,
  setNumberOfQuestions,
  setCurrentQuestion,
  setCorrectAnswers,
  setFinished,
  endTimeRef,
}) => {
  const handleRestart = () => {
    setNumberOfQuestions(null);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setFinished(false);
  };

  return (
    <div className="card flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center flex-wrap gap-2">
        <div className="flex gap-1">
          <p>Résultats :</p>
          <p>
            <span className="text-green-600">{correctAnswers}</span> /{" "}
            {numberOfQuestions}
          </p>
        </div>

        <div className="flex gap-1">
          <p>Temps écoulé :</p>
          <p className="font-semibold text-indigo-500">
            {endTimeRef.current} sec
          </p>
          <span className="text-gray-500">
            {`${(endTimeRef.current / numberOfQuestions).toFixed(1)} s/exo`}
          </span>
        </div>
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
