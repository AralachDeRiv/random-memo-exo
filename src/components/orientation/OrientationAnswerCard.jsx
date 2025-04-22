import React from "react";
import blackArrow from "../../assets/blackArrow.svg";
import whiteArrow from "../../assets/whiteArrow.svg";

const directionToDegrees = {
  "up-right": 45,
  "up-left": 315,
  "down-right": 135,
  "down-left": 225,
};
const colors = ["black", "white"];
const directions = ["up-right", "up-left", "down-right", "down-left"];

const translations = {
  black: "Noir",
  white: "Blanc",
  "up-right": "Droite Haut",
  "up-left": "Gauche Haut",
  "down-right": "Droite Bas",
  "down-left": "Gauche Bas",
  topAboveBottom: "AU-DESSUS",
  bottomAboveTop: "EN-DESSOUS",
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRule = () => {
  const topColor = getRandomItem(colors);
  const bottomColor = getRandomItem(colors.filter((c) => c !== topColor));

  const topDirection = getRandomItem(directions);
  const bottomDirection = getRandomItem(directions);

  const colorRule = {
    type: "color",
    top: topColor,
    bottom: bottomColor,
    relation: Math.random() < 0.5 ? "topAboveBottom" : "bottomAboveTop",
  };

  const directionRule = {
    type: "direction",
    top: topDirection,
    bottom: bottomDirection,
    relation: Math.random() < 0.5 ? "topAboveBottom" : "bottomAboveTop",
  };

  return [colorRule, directionRule];
};

const buildOptionFromRule = ([colorRule, directionRule]) => {
  const colorCombo =
    colorRule.relation === "topAboveBottom"
      ? { top: colorRule.top, bottom: colorRule.bottom }
      : { top: colorRule.bottom, bottom: colorRule.top };

  const directionCombo =
    directionRule.relation === "topAboveBottom"
      ? { top: directionRule.top, bottom: directionRule.bottom }
      : { top: directionRule.bottom, bottom: directionRule.top };

  return {
    top: {
      color: colorCombo.top,
      direction: directionCombo.top,
    },
    bottom: {
      color: colorCombo.bottom,
      direction: directionCombo.bottom,
    },
    isCorrect: true,
  };
};

const generateWrongOptions = (correctOption, colors, directions) => {
  const wrongOptions = [];

  while (wrongOptions.length < 5) {
    let option = JSON.parse(JSON.stringify(correctOption));

    const errorType = getRandomItem(["color", "direction", "invert", "random"]);

    switch (errorType) {
      case "invert":
        [option.top, option.bottom] = [option.bottom, option.top];
        break;
      case "color":
        option.top.color = getRandomItem(
          colors.filter((c) => c !== option.top.color)
        );
        option.bottom.color = getRandomItem(
          colors.filter((c) => c !== option.bottom.color)
        );
        break;
      case "direction":
        if (Math.random() < 0.5) {
          option.bottom.direction = getRandomItem(
            directions.filter((d) => d !== option.bottom.direction)
          );
        } else {
          option.top.direction = getRandomItem(
            directions.filter((d) => d !== option.top.direction)
          );
        }
        break;
      case "random":
        option.top.color = getRandomItem(colors);
        option.top.direction = getRandomItem(directions);
        option.bottom.color = getRandomItem(
          colors.filter((c) => c !== option.top.color)
        );
        option.bottom.direction = getRandomItem(directions);
        break;
    }

    option.isCorrect = false;

    const isDuplicate =
      JSON.stringify(option) === JSON.stringify(correctOption) ||
      wrongOptions.some(
        (opt) =>
          JSON.stringify(opt.top) === JSON.stringify(option.top) &&
          JSON.stringify(opt.bottom) === JSON.stringify(option.bottom)
      );

    if (!isDuplicate) {
      wrongOptions.push(option);
    }
  }

  return wrongOptions;
};

const shuffleArray = (array) => {
  return array
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);
};

const generateQuestionSet = () => {
  const rule = generateRule();
  const correct = buildOptionFromRule(rule);
  const wrongs = generateWrongOptions(correct, colors, directions);
  const options = shuffleArray([correct, ...wrongs]);

  return {
    rule,
    options,
  };
};

const OrientationAnswerCard = ({
  numberOfQuestions,
  currentQuestion,
  setCurrentQuestion,
  setCorrectAnswers,
  setFinished,
}) => {
  const { rule, options } = generateQuestionSet();
  const [colorRule, directionRule] = rule;

  const handleAnswerClick = (option) => {
    if (option.isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestion + 1 < numberOfQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="card text-md sm:text-lg font-semibold flex flex-col items-center gap-3">
      <div className="flex flex-col items-center">
        <p className="whitespace-nowrap text-center">
          {translations[colorRule.top] +
            " " +
            translations[colorRule.relation] +
            " " +
            translations[colorRule.bottom]}
        </p>

        <p className="whitespace-nowrap text-center">
          {translations[directionRule.top] +
            " " +
            translations[directionRule.relation] +
            " " +
            translations[directionRule.bottom]}
        </p>
      </div>

      <div className="w-full h-0.5 bg-gray-400"></div>

      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        {options.map((option, index) => {
          const topDegrees = directionToDegrees[option.top.direction];
          const bottomDegrees = directionToDegrees[option.bottom.direction];
          const topColor = option.top.color;
          const bottomColor = option.bottom.color;

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-20 h-20 border-2 border-gray-400 rounded-lg m-2 hover:scale-95 cursor-pointer active:scale-95 transition-all duration-200"
              onClick={() => handleAnswerClick(option)}
            >
              <div
                className="w-10 h-10 flex items-center justify-center border-gray-600 "
                style={{
                  transform: `rotate(${topDegrees}deg)`,
                }}
              >
                <img
                  src={topColor == "white" ? whiteArrow : blackArrow}
                  alt="top-arrow"
                />
              </div>

              <div
                className="w-10 h-10 flex items-center justify-center border-gray-600 "
                style={{
                  transform: `rotate(${bottomDegrees}deg)`,
                }}
              >
                <img
                  src={bottomColor == "white" ? whiteArrow : blackArrow}
                  alt="top-arrow"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrientationAnswerCard;
