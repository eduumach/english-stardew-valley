import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  learned: number;
  total: number;
}

export function ProgressBar({ learned, total }: ProgressBarProps) {
  const percentage = total > 0 ? (learned / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progresso Geral</span>
        <span className="pixel-title text-xs text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
