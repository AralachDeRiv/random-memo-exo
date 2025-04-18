import React from "react";

const CalculationsResultsCard = ({
  listOfCalculations,
  setListOfCalculations,
  setCalculationSettings,
  setIndex,
}) => {
  const rightAnswers = listOfCalculations.reduce(
    (acc, calculation) => (calculation.isCorrect ? acc + 1 : acc),
    0
  );

  const handleRestart = () => {
    setListOfCalculations([]);
    setCalculationSettings({
      numberOfCalculations: 1,
      difficulty: "easy",
      done: false,
    });
    setIndex(0);
  };

  return (
    <div className="card w-full max-w-3xl mx-auto text-xs sm:text-base">
      <div className="grid grid-cols-4 gap-2 font-semibold border-b pb-2 text-gray-700 ">
        <p className="text-center">#</p>
        <p className="text-center">Expression</p>
        <p className="text-center">Résultat</p>
        <p className="text-center">Réponse</p>
      </div>

      {listOfCalculations.map((calculation, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 gap-2 py-2 text-center ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }`}
        >
          <p>{index + 1}</p>
          <p>{calculation.expression}</p>
          <p>{calculation.result}</p>
          <p
            className={`font-semibold ${
              calculation.isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {calculation.userAnswer}
          </p>
        </div>
      ))}

      <div className="mt-4 flex gap-1.5">
        <p>Résultats :</p>
        <p>
          <span className="text-green-600">{rightAnswers}</span> /{" "}
          {listOfCalculations.length}
        </p>
      </div>

      <div className="mt-4 w-full text-center">
        <button
          type="submit"
          onClick={handleRestart}
          className="mt-2 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 transition"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default CalculationsResultsCard;
