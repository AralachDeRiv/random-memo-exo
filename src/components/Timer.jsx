import React from "react";
import { useEffect, useState } from "react";

const Timer = ({ isRunning, setEndTime }) => {
  let [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setEndTime(time);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  return (
    <div className="absolute top-0 right-0 p-5 text-3xl font-bold text-indigo-500">
      {time}
    </div>
  );
};

export default Timer;
