import React from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { Card } from "./ui/Card";

const FlashcardQuestion = ({
  question,
  onAnswer,
  showAnswer,
  selectedAnswer,
  correctAnswer,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {question.question}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => !showAnswer && onAnswer(index)}
            className={`
              p-4 rounded-lg border transition-colors
              ${
                showAnswer && index === correctAnswer
                  ? "bg-green-100 border-green-500"
                  : ""
              }
              ${
                showAnswer &&
                index === selectedAnswer &&
                index !== correctAnswer
                  ? "bg-red-100 border-red-500"
                  : ""
              }
              ${!showAnswer ? "hover:bg-gray-100 border-gray-200" : ""}
            `}
            whileHover={!showAnswer ? { scale: 1.02 } : {}}
            whileTap={!showAnswer ? { scale: 0.98 } : {}}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Explanation:</h3>
          <p className="text-gray-700">{question.explanation}</p>
        </motion.div>
      )}
    </Card>
  );
};

export default FlashcardQuestion;
