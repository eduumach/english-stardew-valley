import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
  learned: number;
  learning: number;
  newCount: number;
  total: number;
}

export function StatsCard({ learned, learning, newCount, total }: StatsCardProps) {
  return (
    <Card className="pixel-card border-4 border-secondary">
      <CardContent className="flex items-center justify-around gap-4 p-6">
        <div className="text-center">
          <Badge variant="default" className="pixel-button mb-2">
            {learned}
          </Badge>
          <p className="text-xs text-muted-foreground">Aprendidas</p>
        </div>
        <div className="text-center">
          <Badge variant="secondary" className="pixel-button mb-2">
            {learning}
          </Badge>
          <p className="text-xs text-muted-foreground">Revisando</p>
        </div>
        <div className="text-center">
          <Badge variant="outline" className="pixel-button mb-2">
            {newCount}
          </Badge>
          <p className="text-xs text-muted-foreground">Novas</p>
        </div>
        <div className="text-center">
          <Badge className="pixel-button mb-2 bg-accent text-accent-foreground">
            {total}
          </Badge>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </CardContent>
    </Card>
  );
}
