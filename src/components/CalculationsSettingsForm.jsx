import React from "react";

const generateCalculations = (count, difficulty) => {
  const operations = ["+", "-", "*", "/"];
  const generated = [];

  const getRange = () => {
    switch (difficulty) {
      case "easy":
        return [1, 50];
      case "medium":
        return [1, 100];
      case "hard":
        return [1, 150];
      default:
        return [1, 100];
    }
  };

  const [min, max] = getRange();

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < count; i++) {
    const op = operations[i % 4];
    let a, b, result;

    switch (op) {
      case "+":
        a = getRandomInt(min, max);
        b = getRandomInt(min, max);
        result = a + b;
        break;
      case "-":
        a = getRandomInt(min, max);
        b = getRandomInt(min, a);
        result = a - b;
        break;
      case "*":
        b = getRandomInt(min, max);
        const maxA = Math.floor(max / b);
        a = getRandomInt(min, maxA);
        result = a * b;
        break;

      case "/":
        b = getRandomInt(min, max);
        result = getRandomInt(min, Math.floor(max / b));
        a = b * result;
        break;
    }

    generated.push({
      a,
      b,
      op,
      result,
      expression: `${a} ${op} ${b}`,
      userAnswer: null,
      isCorrect: false,
    });
  }

  return generated;
};

const CalculationsSettingsForm = ({
  setCalculationSettings,
  calculationSettings,
  setListOfCalculations,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const generated = generateCalculations(
      parseInt(calculationSettings.numberOfCalculations),
      calculationSettings.difficulty
    );

    setListOfCalculations(generated);
    setCalculationSettings((prev) => ({
      ...prev,
      done: true,
    }));
  };

  return (
    <form className="card flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <label
          htmlFor="numberOfCalculations"
          className="font-medium text-gray-700 "
        >
          Nombre de calculs
        </label>
        <input
          type="number"
          name="numberOfCalculations"
          id="numberOfCalculations"
          defaultValue="1"
          min="1"
          max="100"
          onChange={(e) =>
            setCalculationSettings((prev) => ({
              ...prev,
              numberOfCalculations: e.target.value,
            }))
          }
          className="w-24 px-3 py-2 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="difficulty" className="font-medium text-gray-700">
          Difficulté
        </label>
        <select
          name="difficulty"
          id="difficulty"
          onChange={(e) =>
            setCalculationSettings((prev) => ({
              ...prev,
              difficulty: e.target.value,
            }))
          }
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="easy">Facile</option>
          <option value="medium">Moyen</option>
          <option value="hard">Difficile</option>
        </select>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-2 self-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 transition"
      >
        Valider
      </button>
    </form>
  );
};

export default CalculationsSettingsForm;
