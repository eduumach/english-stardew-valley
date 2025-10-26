import { useState, useMemo } from 'react';
import type { Phrase, Category } from '@/data/phrases';

export function useFlashcardDeck(allPhrases: Phrase[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredPhrases = useMemo(() => {
    if (selectedCategory === 'all') return allPhrases;
    return allPhrases.filter((p) => p.category === selectedCategory);
  }, [allPhrases, selectedCategory]);

  const currentPhrase = filteredPhrases[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhrases.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredPhrases.length) % filteredPhrases.length);
  };

  const goToCard = (index: number) => {
    if (index >= 0 && index < filteredPhrases.length) {
      setCurrentIndex(index);
    }
  };

  const changeCategory = (category: Category | 'all') => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Reset to first card when changing category
  };

  return {
    currentPhrase,
    currentIndex,
    totalCards: filteredPhrases.length,
    nextCard,
    prevCard,
    goToCard,
    selectedCategory,
    changeCategory,
    filteredPhrases,
  };
}
