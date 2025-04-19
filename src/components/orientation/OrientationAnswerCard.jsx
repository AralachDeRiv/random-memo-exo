import React from "react";

const directionToDegrees = {
  "up-right": 45,
  "up-left": 315,
  "down-right": 135,
  "down-left": 225,
};
const colors = ["black", "white"];
const directions = ["up-right", "up-left", "down-right", "down-left"];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRule = () => {
  const topColor = getRandomItem(colors);
  const bottomColor = getRandomItem(colors);

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
  const getBasedOnRule = (rule) => {
    return rule.relation === "topAboveBottom"
      ? { top: rule.top, bottom: rule.bottom }
      : { top: rule.bottom, bottom: rule.top };
  };

  return {
    top: {
      color: getBasedOnRule(colorRule).top,
      direction: getBasedOnRule(directionRule).top,
    },
    bottom: {
      color: getBasedOnRule(colorRule).bottom,
      direction: getBasedOnRule(directionRule).bottom,
    },
    isCorrect: true,
  };
};

const generateWrongOptions = (correctOption, colors, directions) => {
  const wrongOptions = [];

  while (wrongOptions.length < 5) {
    let option = JSON.parse(JSON.stringify(correctOption)); // deep clone

    const errorType = getRandomItem(["color", "direction", "invert", "random"]);

    switch (errorType) {
      case "invert":
        [option.top, option.bottom] = [option.bottom, option.top];
        break;
      case "color":
        option.top.color = getRandomItem(
          colors.filter((c) => c !== option.top.color)
        );
        break;
      case "direction":
        option.bottom.direction = getRandomItem(
          directions.filter((d) => d !== option.bottom.direction)
        );
        break;
      case "random":
        option.top.color = getRandomItem(colors);
        option.top.direction = getRandomItem(directions);
        option.bottom.color = getRandomItem(colors);
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
  listOfResults,
  setListOfResults,
}) => {
  return <div>OrientationAnswerCard</div>;
};

export default OrientationAnswerCard;
