import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizOptions } from './QuizOptions';
import type { Phrase } from '@/data/phrases';
import type { QuizOption } from '@/hooks/useQuizMode';
import { ChevronRight, BarChart3, Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface QuizCardProps {
  phrase: Phrase;
  options: QuizOption[];
  selectedAnswer: number | null;
  hasAnswered: boolean;
  correctCount: number;
  wrongCount: number;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  onShowResults: () => void;
}

export function QuizCard({
  phrase,
  options,
  selectedAnswer,
  hasAnswered,
  correctCount,
  wrongCount,
  onSelectAnswer,
  onNext,
  onShowResults,
}: QuizCardProps) {
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(phrase.english, 'en-US');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="pixel-card border-4 border-secondary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="pixel-button">
              {phrase.category}
            </Badge>
            <div className="flex gap-2">
              <Badge variant="default" className="pixel-button">
                ✓ {correctCount}
              </Badge>
              <Badge variant="destructive" className="pixel-button">
                ✗ {wrongCount}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-6 flex items-center justify-center gap-3">
              <CardTitle className="text-center text-2xl md:text-3xl">
                {phrase.english}
              </CardTitle>
              {isSupported && (
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
              )}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Qual é a tradução correta?
            </p>
          </div>

          <QuizOptions
            options={options}
            selectedAnswer={selectedAnswer}
            hasAnswered={hasAnswered}
            onSelectAnswer={onSelectAnswer}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onShowResults}
          className="pixel-button flex-1"
        >
          <BarChart3 className="mr-2 h-5 w-5" />
          Ver Resultados
        </Button>
        {hasAnswered && (
          <Button
            variant="default"
            size="lg"
            onClick={onNext}
            className="pixel-button flex-1"
          >
            Próxima
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
