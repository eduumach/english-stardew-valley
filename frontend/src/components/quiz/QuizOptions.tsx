import { Button } from '@/components/ui/button';
import type { QuizOption } from '@/hooks/useQuizMode';
import { Check, X } from 'lucide-react';

interface QuizOptionsProps {
  options: QuizOption[];
  selectedAnswer: number | null;
  hasAnswered: boolean;
  onSelectAnswer: (index: number) => void;
}

export function QuizOptions({
  options,
  selectedAnswer,
  hasAnswered,
  onSelectAnswer,
}: QuizOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        const showCorrect = hasAnswered && option.isCorrect;
        const showWrong = hasAnswered && isSelected && !option.isCorrect;

        return (
          <Button
            key={index}
            variant={
              showCorrect ? 'default' : showWrong ? 'destructive' : 'outline'
            }
            size="lg"
            onClick={() => onSelectAnswer(index)}
            disabled={hasAnswered}
            className="pixel-button h-auto min-h-[80px] whitespace-normal text-sm"
          >
            <span className="flex items-center gap-2">
              {showCorrect && <Check className="h-5 w-5" />}
              {showWrong && <X className="h-5 w-5" />}
              {option.text}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
