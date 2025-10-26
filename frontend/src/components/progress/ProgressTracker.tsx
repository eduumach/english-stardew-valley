import { StatsCard } from './StatsCard';
import { ProgressBar } from './ProgressBar';
import { Separator } from '@/components/ui/separator';

interface ProgressTrackerProps {
  learned: number;
  learning: number;
  newCount: number;
  total: number;
}

export function ProgressTracker({ learned, learning, newCount, total }: ProgressTrackerProps) {
  return (
    <div className="space-y-4">
      <ProgressBar learned={learned} total={total} />
      <Separator />
      <StatsCard learned={learned} learning={learning} newCount={newCount} total={total} />
    </div>
  );
}
