import React from "react";
import { useState, useEffect } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import CalculationsSettingsForm from "../components/CalculationsSettingsForm";
import CalculationAnswerCard from "../components/CalculationAnswerCard";
import CalculationsResultsCard from "../components/CalculationsResultsCard";

const Calculation = () => {
  let [listOfCalculations, setListOfCalculations] = useState([]);
  let [calculationSettings, setCalculationSettings] = useState({
    numberOfCalculations: 1,
    difficulty: "easy",
    done: false,
  });
  let [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(listOfCalculations);
  }, [calculationSettings, listOfCalculations]);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-start md:items-center justify-center">
      <BackHomeBtn />
      {!calculationSettings.done && (
        <CalculationsSettingsForm
          setCalculationSettings={setCalculationSettings}
          calculationSettings={calculationSettings}
          setListOfCalculations={setListOfCalculations}
        />
      )}
      {calculationSettings.done && index < listOfCalculations.length && (
        <CalculationAnswerCard
          index={index}
          setIndex={setIndex}
          listOfCalculations={listOfCalculations}
          setListOfCalculations={setListOfCalculations}
        />
      )}
      {listOfCalculations.length > 0 && index == listOfCalculations.length && (
        <CalculationsResultsCard
          listOfCalculations={listOfCalculations}
          setListOfCalculations={setListOfCalculations}
          setCalculationSettings={setCalculationSettings}
          setIndex={setIndex}
        />
      )}
    </div>
  );
};

export default Calculation;
