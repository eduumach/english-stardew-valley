import { Button } from '@/components/ui/button';
import { BookOpen, Brain } from 'lucide-react';

export type AppMode = 'study' | 'quiz';

interface ModeSelectorProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant={mode === 'study' ? 'default' : 'outline'}
        size="lg"
        onClick={() => onModeChange('study')}
        className="pixel-button flex-1"
      >
        <BookOpen className="mr-2 h-5 w-5" />
        Estudar
      </Button>
      <Button
        variant={mode === 'quiz' ? 'default' : 'outline'}
        size="lg"
        onClick={() => onModeChange('quiz')}
        className="pixel-button flex-1"
      >
        <Brain className="mr-2 h-5 w-5" />
        Quiz
      </Button>
    </div>
  );
}
