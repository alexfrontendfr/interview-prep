import React, { useState } from "react";
import Flashcard from "./components/Flashcard";
import FlashcardStats from "./components/FlashcardStats";
import StudySettings from "./components/StudySettings";
import questions from "./data/questions.json";
import { motion, AnimatePresence } from "framer-motion";
import useProgress from "./hooks/useProgress";
import useFlashcards from "./hooks/useFlashcards";

const gradients = [
  "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
  "bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600",
  "bg-gradient-to-r from-blue-500 via-teal-500 to-green-500",
];

const App = () => {
  const { progress, updateProgress, resetProgress } = useProgress();
  const {
    currentQuestion,
    nextQuestion,
    totalQuestions,
    currentIndex,
    setSettings,
  } = useFlashcards(questions);
  const [finished, setFinished] = useState(false);

  const handleNextQuestion = (isCorrect) => {
    updateProgress(isCorrect);
    if (currentIndex + 1 < totalQuestions) {
      nextQuestion();
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    resetProgress();
    setFinished(false);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    handleReset();
  };

  const backgroundClass = gradients[currentIndex % gradients.length];

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <div className="container max-w-4xl mx-auto p-4">
        <h1 className="text-3xl text-center text-white mb-6">
          IT Support Flashcards
        </h1>

        <FlashcardStats progress={progress} totalQuestions={totalQuestions} />

        {finished ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl mb-4">Quiz Finished!</h2>
            <p className="mb-4">
              Correct: {progress.correct} / {totalQuestions} (
              {Math.round((progress.correct / totalQuestions) * 100)}%)
            </p>
            <button
              onClick={handleReset}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start New Session
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Flashcard
                questionData={currentQuestion}
                onNextQuestion={handleNextQuestion}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <StudySettings onSettingsChange={handleSettingsChange} />
      </div>
    </div>
  );
};

export default App;
