import React, { useState } from "react";

const OrientationsSettingsForm = ({ setNumberOfQuestions, setIsRunning }) => {
  const [number, setNumber] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number >= 1) {
      setNumberOfQuestions(number);
      setIsRunning(true);
    }
  };

  return (
    <form className="card flex flex-col gap-3.5">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <label
          htmlFor="numberOfCalculations"
          className="font-medium text-gray-700 "
        >
          Nombre de questions
        </label>
        <input
          type="number"
          name="numberOfCalculations"
          id="numberOfCalculations"
          defaultValue="1"
          min="1"
          max="100"
          onChange={(e) => setNumber(e.target.value)}
          className="w-24 px-3 py-2 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
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

export default OrientationsSettingsForm;
