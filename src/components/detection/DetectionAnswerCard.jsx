import React from "react";

const charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const domainSuffixes = [".com", ".net", ".org", ".co", ".fr", ".io"];

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomString = (length) =>
  Array.from({ length }, () => getRandomItem(charset)).join("");

const generateEmail = () => {
  const user = getRandomString(6).toLowerCase();
  const domain = getRandomString(5).toLowerCase();
  const suffix = getRandomItem(domainSuffixes);
  return `${user}@${domain}${suffix}`;
};

const generateURL = () => {
  const domain = getRandomString(6).toLowerCase();
  const suffix = getRandomItem(domainSuffixes);
  return `http://www.${domain}${suffix}`;
};

const generateFilename = () => {
  const name = getRandomString(5);
  const version = `v${Math.ceil(Math.random() * 5)}`;
  const ext = getRandomItem([".pdf", ".doc", ".txt"]);
  return `${name}_${version}-final${ext}`;
};

const generateDate = () => {
  const day = String(Math.floor(Math.random() * 28 + 1)).padStart(2, "0");
  const month = String(Math.floor(Math.random() * 12 + 1)).padStart(2, "0");
  const year = String(2000 + Math.floor(Math.random() * 25));
  return `${day}/${month}/${year}`;
};

const words = [
  "Tristdene",
  "Fhistgene",
  "Lombard",
  "Cazeneuve",
  "Bellatrix",
  "Xeon",
  "Jupiter",
  "Neutrino",
  "Avalanche",
  "Marcellus",
  "Quasar",
  "Thalassa",
  "Vortex",
  "Zéphyr",
  "Orion",
  "Nimbus",
  "Andromède",
  "Hydra",
  "Lyra",
  "Castor",
  "Pollux",
  "Cosmos",
  "Mirage",
  "Saturne",
  "Phoenix",
  "Vega",
  "Altair",
  "Cygnus",
  "Silicon",
  "Tempête",
  "Nova",
  "Hyperion",
  "Artemis",
  "Chronos",
  "Galilée",
  "Eclipse",
  "Oberon",
];

const generateRandomText = () => {
  return `${getRandomItem(words)} ${Math.floor(Math.random() * 100)}`;
};

const generateBaseString = () => {
  const types = [
    generateEmail,
    generateURL,
    generateFilename,
    generateDate,
    generateRandomText,
    () => getRandomString(12),
  ];
  return getRandomItem(types)();
};

const generateStringWithErrors = () => {
  const maxErrors = 4;
  const original = generateBaseString();
  const length = original.length;
  const numberOfErrors = Math.floor(Math.random() * (maxErrors + 1));
  const copy = original.split("");

  const usedIndices = new Set();
  while (usedIndices.size < numberOfErrors) {
    const index = Math.floor(Math.random() * length);
    if (!usedIndices.has(index) && original[index] !== " ") {
      let newChar;
      do {
        newChar = getRandomItem(charset + "@.-");
      } while (newChar === original[index]);
      copy[index] = newChar;
      usedIndices.add(index);
    }
  }

  return {
    original,
    copy: copy.join(""),
    numberOfErrors,
  };
};

const DetectionAnswerCard = ({
  numberOfQuestions,
  currentQuestion,
  setCurrentQuestion,
  setCorrectAnswers,
  setFinished,
}) => {
  const { original, copy, numberOfErrors = 0 } = generateStringWithErrors();

  const handleClick = (index) => {
    if (index === numberOfErrors) {
      setCorrectAnswers((prev) => prev + 1);
    }
    if (currentQuestion + 1 < numberOfQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="card flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-lg">{original}</p>
        <p className="text-lg">{copy}</p>
      </div>

      <div className="w-full h-0.5 bg-gray-300 my-2"></div>

      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            onClick={() => handleClick(index)}
            key={index}
            className="cursor-pointer px-4 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition active:scale-95 shadow-sm"
          >
            {index}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DetectionAnswerCard;
