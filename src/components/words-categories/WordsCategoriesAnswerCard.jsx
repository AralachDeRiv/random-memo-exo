import React, { useState, useEffect } from "react";
import wordsWithCategories from "../../assets/wordsWithCategories.json";

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const shuffleArray = (array) =>
  array
    .map((v) => ({ v, s: Math.random() }))
    .sort((a, b) => a.s - b.s)
    .map(({ v }) => v);

const generateMemoryWordExercise = () => {
  const allCategories = Object.keys(wordsWithCategories);
  const selectedCategories = shuffleArray(allCategories).slice(0, 3);
  const trueCount = getRandomItem([0, 1, 2, 3]);

  const words = [];

  // Génère les bons mots
  const truePositions = shuffleArray([0, 1, 2]).slice(0, trueCount);

  for (let i = 0; i < 3; i++) {
    const ruleCategory = selectedCategories[i];

    if (truePositions.includes(i)) {
      // Bonne correspondance (catégorie correcte à la bonne position)
      const word = getRandomItem(wordsWithCategories[ruleCategory]);
      words.push(word);
    } else {
      const otherIndices = [0, 1, 2].filter((j) => j !== i);
      const chance = Math.random();

      if (chance < 0.7) {
        // Mauvaise position : mot venant d'une autre règle mais mauvaise place
        const altRuleIndex = getRandomItem(otherIndices);
        const altCategory = selectedCategories[altRuleIndex];
        const word = getRandomItem(wordsWithCategories[altCategory]);
        words.push(word);
      } else {
        // Totalement hors catégorie
        const outCategory = getRandomItem(
          allCategories.filter((cat) => !selectedCategories.includes(cat))
        );
        const word = getRandomItem(wordsWithCategories[outCategory]);
        words.push(word);
      }
    }
  }

  return {
    rules: selectedCategories,
    words,
    correctAnswer: trueCount,
  };
};

const WordsCategoriesAnswerCard = ({
  numberOfQuestions,
  currentQuestion,
  setCurrentQuestion,
  setCorrectAnswers,
  setFinished,
}) => {
  const [exercise, setExercise] = useState(null);
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    const newExercise = generateMemoryWordExercise();
    setExercise(newExercise);
    setShowWords(false);
  }, [currentQuestion]);

  const handleAnswer = (index) => {
    if (index === exercise.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (currentQuestion + 1 < numberOfQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="card">
      {exercise && !showWords && (
        <div
          onClick={() => setShowWords(true)}
          className="cursor-pointer w-full h-full flex flex-wrap justify-around gap-6 hover:scale-[0.98] active:scale-[0.98] transition duration-200"
        >
          {exercise.rules.map((category, index) => (
            <p key={index} className="whitespace-nowrap text-md font-bold">
              {category}
            </p>
          ))}
        </div>
      )}

      {exercise && showWords && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-wrap justify-around gap-6">
            {exercise.words.map((word, index) => (
              <p
                key={index}
                className="whitespace-nowrap text-md font-semibold"
              >
                {word}
              </p>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="cursor-pointer px-4 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition active:scale-95 shadow-sm"
              >
                {index}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordsCategoriesAnswerCard;
