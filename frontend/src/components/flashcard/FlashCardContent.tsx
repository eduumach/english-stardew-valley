import type { Phrase } from '@/data/phrases';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FlashCardContentProps {
  phrase: Phrase;
  isFlipped: boolean;
}

export function FlashCardContent({ phrase, isFlipped }: FlashCardContentProps) {
  return (
    <Card className="pixel-card h-full border-4 border-secondary bg-card">
      <CardContent className="flex h-full min-h-[300px] flex-col items-center justify-center p-8">
        <Badge variant="secondary" className="mb-6 pixel-button">
          {phrase.category}
        </Badge>
        <div className="text-center">
          <p className="text-2xl font-bold leading-relaxed text-card-foreground md:text-3xl">
            {isFlipped ? phrase.portuguese : phrase.english}
          </p>
        </div>
        <div className="mt-6">
          <Badge
            variant={
              phrase.difficulty === 'easy'
                ? 'default'
                : phrase.difficulty === 'medium'
                  ? 'secondary'
                  : 'destructive'
            }
            className="pixel-button"
          >
            {phrase.difficulty}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
