import React from "react";
import { useState, useRef } from "react";
import BackHomeBtn from "../components/BackHomeBtn";
import CalculationsSettingsForm from "../components/CalculationsSettingsForm";
import CalculationAnswerCard from "../components/CalculationAnswerCard";
import CalculationsResultsCard from "../components/CalculationsResultsCard";
import Timer from "../components/Timer";

const Calculation = () => {
  const [listOfCalculations, setListOfCalculations] = useState([]);
  const [calculationSettings, setCalculationSettings] = useState({
    numberOfCalculations: 1,
    difficulty: "easy",
    done: false,
  });
  let [index, setIndex] = useState(0);
  const endTimeRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen w-full pt-24 px-5 flex items-center justify-center">
      <BackHomeBtn />

      {!calculationSettings.done && (
        <CalculationsSettingsForm
          setCalculationSettings={setCalculationSettings}
          calculationSettings={calculationSettings}
          setListOfCalculations={setListOfCalculations}
          setIsRunning={setIsRunning}
        />
      )}

      {calculationSettings.done && index < listOfCalculations.length && (
        <>
          <Timer
            isRunning={isRunning}
            setEndTime={(time) => (endTimeRef.current = time)}
          />

          <CalculationAnswerCard
            index={index}
            setIndex={setIndex}
            listOfCalculations={listOfCalculations}
            setListOfCalculations={setListOfCalculations}
            setIsRunning={setIsRunning}
          />
        </>
      )}

      {listOfCalculations.length > 0 && index == listOfCalculations.length && (
        <CalculationsResultsCard
          listOfCalculations={listOfCalculations}
          setListOfCalculations={setListOfCalculations}
          setCalculationSettings={setCalculationSettings}
          setIndex={setIndex}
          endTimeRef={endTimeRef}
        />
      )}
    </div>
  );
};

export default Calculation;
