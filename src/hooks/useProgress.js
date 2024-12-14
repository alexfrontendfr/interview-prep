import { useState } from "react";

const useProgress = () => {
  const [progress, setProgress] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0,
  });

  const updateProgress = (isCorrect) => {
    setProgress((prev) => ({
      ...prev,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
    }));
  };

  const resetProgress = () => {
    setProgress({
      correct: 0,
      incorrect: 0,
      streak: 0,
    });
  };

  return {
    progress,
    updateProgress,
    resetProgress,
  };
};

export default useProgress;
