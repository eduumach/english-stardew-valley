import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Trophy,
  Target,
  Flame,
  Clock,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

interface ProgressDashboardProps {
  stats: {
    totalPhrases: number;
    masteredPhrases: number;
    learningPhrases: number;
    newPhrases: number;
    averageMastery: number;
    totalSessions: number;
    totalTimeStudied: number;
    currentStreak: number;
    longestStreak: number;
    quizAccuracy: number;
  };
}

export function ProgressDashboard({ stats }: ProgressDashboardProps) {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getMasteryLevel = (mastery: number): { label: string; color: string } => {
    if (mastery >= 80) return { label: 'Expert', color: 'bg-green-500' };
    if (mastery >= 60) return { label: 'Avançado', color: 'bg-blue-500' };
    if (mastery >= 40) return { label: 'Intermediário', color: 'bg-yellow-500' };
    return { label: 'Iniciante', color: 'bg-gray-500' };
  };

  const masteryLevel = getMasteryLevel(stats.averageMastery);

  return (
    <div className="space-y-6">
      {/* Estatísticas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total de frases */}
        <Card className="pixel-card border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Frases</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPhrases}</div>
            <p className="text-xs text-muted-foreground">
              {stats.masteredPhrases} dominadas
            </p>
          </CardContent>
        </Card>

        {/* Streak atual */}
        <Card className="pixel-card border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak} dias</div>
            <p className="text-xs text-muted-foreground">
              Recorde: {stats.longestStreak} dias
            </p>
          </CardContent>
        </Card>

        {/* Tempo total */}
        <Card className="pixel-card border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Estudo</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(stats.totalTimeStudied)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalSessions} sessões
            </p>
          </CardContent>
        </Card>

        {/* Precisão no quiz */}
        <Card className="pixel-card border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precisão Quiz</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quizAccuracy}%</div>
            <p className="text-xs text-muted-foreground">
              Taxa de acerto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Domínio médio */}
      <Card className="pixel-card border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Nível de Domínio
            </CardTitle>
            <Badge className={`pixel-button ${masteryLevel.color} text-white`}>
              {masteryLevel.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso Geral</span>
              <span className="font-bold">{stats.averageMastery}%</span>
            </div>
            <Progress value={stats.averageMastery} className="h-3" />
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {stats.masteredPhrases}
              </div>
              <div className="text-xs text-muted-foreground">Dominadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.learningPhrases}
              </div>
              <div className="text-xs text-muted-foreground">Aprendendo</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {stats.newPhrases}
              </div>
              <div className="text-xs text-muted-foreground">Novas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivação */}
      {stats.currentStreak >= 7 && (
        <Card className="pixel-card border-2 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
          <CardContent className="flex items-center gap-3 pt-6">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div>
              <p className="font-bold">Parabéns! 🎉</p>
              <p className="text-sm text-muted-foreground">
                Você está mantendo uma sequência incrível de {stats.currentStreak} dias!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
