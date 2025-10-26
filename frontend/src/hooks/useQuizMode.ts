import { useState, useMemo } from 'react';
import type { Phrase } from '@/data/phrases';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export function useQuizMode(currentPhrase: Phrase | undefined, allPhrases: Phrase[]) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

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
