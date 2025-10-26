import { useState, useMemo, useEffect } from 'react';
import type { Phrase } from '@/data/phrases';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

const STORAGE_KEY_CORRECT = 'stardew-quiz-correct';
const STORAGE_KEY_WRONG = 'stardew-quiz-wrong';

export function useQuizMode(currentPhrase: Phrase | undefined, allPhrases: Phrase[]) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_CORRECT);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [wrongCount, setWrongCount] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_WRONG);
    return stored ? parseInt(stored, 10) : 0;
  });

  const options = useMemo(() => {
    if (!currentPhrase) return [];

    const correctAnswer = currentPhrase.portuguese;

    // Get 3 random wrong answers from the same category
    const wrongAnswers = allPhrases
      .filter((p) => p.id !== currentPhrase.id && p.category === currentPhrase.category)
      .map((p) => p.portuguese)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Combine and shuffle
    const allOptions = [
      { text: correctAnswer, isCorrect: true },
      ...wrongAnswers.map((text) => ({ text, isCorrect: false })),
    ].sort(() => Math.random() - 0.5);

    return allOptions;
  }, [currentPhrase, allPhrases]);

  // Salva correctCount no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CORRECT, correctCount.toString());
  }, [correctCount]);

  // Salva wrongCount no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WRONG, wrongCount.toString());
  }, [wrongCount]);

  const selectAnswer = (index: number) => {
    if (hasAnswered) return;

    setSelectedAnswer(index);
    setHasAnswered(true);

    if (options[index].isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setCorrectCount(0);
    setWrongCount(0);
    localStorage.removeItem(STORAGE_KEY_CORRECT);
    localStorage.removeItem(STORAGE_KEY_WRONG);
  };

  return {
    options,
    selectedAnswer,
    hasAnswered,
    correctCount,
    wrongCount,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  };
}
