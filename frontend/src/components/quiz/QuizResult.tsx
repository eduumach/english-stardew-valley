import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Target } from 'lucide-react';

interface QuizResultProps {
  isOpen: boolean;
  correctCount: number;
  wrongCount: number;
  onClose: () => void;
  onReset: () => void;
}

export function QuizResult({
  isOpen,
  correctCount,
  wrongCount,
  onClose,
  onReset,
}: QuizResultProps) {
  const total = correctCount + wrongCount;
  const percentage = total > 0 ? (correctCount / total) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="pixel-card border-4 border-secondary">
        <DialogHeader>
          <DialogTitle className="pixel-title flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-8 w-8 text-primary" />
            Resultados
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Confira seu desempenho no quiz!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Target className="h-12 w-12 text-primary" />
              <span className="pixel-title text-4xl text-primary">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-primary/10 p-4">
              <p className="pixel-title text-2xl text-primary">{correctCount}</p>
              <p className="text-sm text-muted-foreground">Corretas</p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-4">
              <p className="pixel-title text-2xl text-destructive">{wrongCount}</p>
              <p className="text-sm text-muted-foreground">Erradas</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={onReset} className="pixel-button w-full">
            Reiniciar Quiz
          </Button>
          <Button onClick={onClose} variant="outline" className="pixel-button w-full">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
