import React from "react";
import { useState, useEffect } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import CalculationsSettingsForm from "../components/CalculationsSettingsForm";

const Calculation = () => {
  let [listOfCalculations, setListOfCalculations] = useState([]);
  let [calculationSettings, setCalculationSettings] = useState({
    numberOfCalculations: 1,
    difficulty: "easy",
    done: false,
  });

  useEffect(() => {
    console.log(listOfCalculations);
  }, [calculationSettings, listOfCalculations]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <BackHomeBtn />
      {!calculationSettings.done && (
        <CalculationsSettingsForm
          setCalculationSettings={setCalculationSettings}
          calculationSettings={calculationSettings}
          setListOfCalculations={setListOfCalculations}
        />
      )}
    </div>
  );
};

export default Calculation;
