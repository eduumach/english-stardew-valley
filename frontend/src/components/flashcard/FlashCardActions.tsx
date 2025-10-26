import { Button } from '@/components/ui/button';
import { ThumbsUp, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashCardActionsProps {
  onMarkLearned: () => void;
  onMarkReview: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCards: number;
}

export function FlashCardActions({
  onMarkLearned,
  onMarkReview,
  onPrevious,
  onNext,
  currentIndex,
  totalCards,
}: FlashCardActionsProps) {
  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="secondary"
          size="lg"
          onClick={onPrevious}
          className="pixel-button flex-1"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="pixel-title text-sm text-muted-foreground">
          {currentIndex + 1} / {totalCards}
        </span>

        <Button
          variant="secondary"
          size="lg"
          onClick={onNext}
          className="pixel-button flex-1"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Actions */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onMarkReview}
          className="pixel-button flex-1"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Revisar
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={onMarkLearned}
          className="pixel-button flex-1"
        >
          <ThumbsUp className="mr-2 h-5 w-5" />
          Aprendi
        </Button>
      </div>
    </div>
  );
}
