import { useState, useEffect } from 'react';

export type PhraseStatus = 'new' | 'learning' | 'learned';

export interface PhraseProgress {
  [phraseId: string]: PhraseStatus;
}

const STORAGE_KEY = 'stardew-flashcard-progress';

export function useFlashcardProgress() {
  const [progress, setProgress] = useState<PhraseProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (phraseId: string, status: PhraseStatus) => {
    setProgress((prev) => ({
      ...prev,
      [phraseId]: status,
    }));
  };

  const getProgress = (phraseId: string): PhraseStatus => {
    return progress[phraseId] || 'new';
  };

  const getStats = () => {
    const statuses = Object.values(progress);
    return {
      learned: statuses.filter((s) => s === 'learned').length,
      learning: statuses.filter((s) => s === 'learning').length,
      new: statuses.filter((s) => s === 'new').length,
    };
  };

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    progress,
    updateProgress,
    getProgress,
    getStats,
    resetProgress,
  };
}
