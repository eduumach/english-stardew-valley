import type { Phrase } from '@/data/phrases';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface FlashCardContentProps {
  phrase: Phrase;
  isFlipped: boolean;
}

export function FlashCardContent({ phrase, isFlipped }: FlashCardContentProps) {
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita virar o card ao clicar no botão
    if (isSpeaking) {
      stop();
    } else {
      speak(phrase.english, 'en-US');
    }
  };

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
        {!isFlipped && isSupported && (
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSpeak}
              className="pixel-button"
              title="Ouvir pronúncia em inglês"
            >
              {isSpeaking ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        )}
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
