import { useState, useEffect } from 'react';
import type { Phrase } from '@/data/phrases';
import { FlashCardContent } from './FlashCardContent';
import { FlashCardActions } from './FlashCardActions';

interface FlashCardProps {
  phrase: Phrase;
  currentIndex: number;
  totalCards: number;
  onMarkLearned: () => void;
  onMarkReview: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function FlashCard({
  phrase,
  currentIndex,
  totalCards,
  onMarkLearned,
  onMarkReview,
  onPrevious,
  onNext,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleMarkLearned = () => {
    onMarkLearned();
  };

  const handleMarkReview = () => {
    onMarkReview();
  };

  return (
    <div className="space-y-6">
      <div
        className={`flip-card cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={handleClick}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <FlashCardContent phrase={phrase} isFlipped={false} />
          </div>
          <div className="flip-card-back">
            <FlashCardContent phrase={phrase} isFlipped={true} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ✦ Clique no card para virar ✦
        </p>
      </div>

      <FlashCardActions
        onMarkLearned={handleMarkLearned}
        onMarkReview={handleMarkReview}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalCards={totalCards}
      />
    </div>
  );
}
