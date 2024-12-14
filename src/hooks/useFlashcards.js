import { useState, useEffect } from "react";

const useFlashcards = (initialQuestions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState(initialQuestions.questions || []);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  const nextQuestion = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= filteredQuestions.length ? 0 : prev + 1
    );
  };

  const setSettings = ({ categories, difficulty }) => {
    let filtered = [...questions];

    if (categories && categories.length > 0) {
      filtered = filtered.filter((q) =>
        categories.some((cat) => q.categories?.includes(cat))
      );
    }

    if (difficulty) {
      filtered = filtered.filter((q) => q.difficulty === difficulty);
    }

    setFilteredQuestions(filtered);
    setCurrentIndex(0);
  };

  return {
    currentQuestion: filteredQuestions[currentIndex],
    nextQuestion,
    totalQuestions: filteredQuestions.length,
    currentIndex,
    setSettings,
  };
};

export default useFlashcards;
