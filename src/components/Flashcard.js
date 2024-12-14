import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";

const Flashcard = ({ questionData, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  useEffect(() => {
    if (questionData && questionData.options) {
      const shuffleOptions = () => {
        const shuffled = [...questionData.options]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        const newCorrectIndex = shuffled.indexOf(
          questionData.options[questionData.answer]
        );
        setShuffledOptions(shuffled);
        setCorrectAnswerIndex(newCorrectIndex);
      };

      shuffleOptions();
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  }, [questionData]);

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null || !questionData) return;

    setSelectedAnswer(index);
    setIsCorrect(index === correctAnswerIndex);
  };

  const handleNext = () => {
    if (isCorrect !== null) {
      onNextQuestion(isCorrect);
    }
  };

  if (!questionData) return null;

  return (
    <Card className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
        {questionData.question}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className={`py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-semibold transition duration-300 ease-in-out transform 
              ${
                selectedAnswer === null
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : selectedAnswer === index
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : index === correctAnswerIndex && selectedAnswer !== null
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }
              ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}
            `}
            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {selectedAnswer !== null && questionData.explanation && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p
            className={`text-lg font-bold ${
              isCorrect ? "text-green-500" : "text-red-500"
            } mb-2`}
          >
            {isCorrect ? "Correct!" : "Incorrect!"}
          </p>
          <p className="text-gray-700 text-base sm:text-lg mb-4">
            {questionData.explanation}
          </p>
          <motion.button
            onClick={handleNext}
            className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Question
          </motion.button>
        </motion.div>
      )}
    </Card>
  );
};

export default Flashcard;
