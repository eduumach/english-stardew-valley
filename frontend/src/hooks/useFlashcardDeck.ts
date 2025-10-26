import { useState, useMemo, useEffect } from 'react';
import type { Phrase, Category } from '@/data/phrases';

const STORAGE_KEY_INDEX = 'stardew-current-index';
const STORAGE_KEY_CATEGORY = 'stardew-selected-category';

export function useFlashcardDeck(allPhrases: Phrase[]) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_INDEX);
    return stored ? parseInt(stored, 10) : 0;
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_CATEGORY);
    return (stored as Category | 'all') || 'all';
  });

  const filteredPhrases = useMemo(() => {
    if (selectedCategory === 'all') return allPhrases;
    return allPhrases.filter((p) => p.category === selectedCategory);
  }, [allPhrases, selectedCategory]);

  const currentPhrase = filteredPhrases[currentIndex];

  // Salva o índice no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INDEX, currentIndex.toString());
  }, [currentIndex]);

  // Salva a categoria no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATEGORY, selectedCategory);
  }, [selectedCategory]);

  // Valida o índice quando as frases filtradas mudam
  useEffect(() => {
    if (currentIndex >= filteredPhrases.length && filteredPhrases.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredPhrases.length, currentIndex]);

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
