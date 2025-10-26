import { useState, useEffect, useCallback } from 'react';

export type ActivityType = 'flashcard' | 'quiz';

export interface PhraseProgress {
  id: string;
  timesStudied: number;
  lastStudied: string;
  correctAnswers: number;
  wrongAnswers: number;
  mastery: number; // 0-100
}

export interface StudySession {
  date: string;
  duration: number; // em segundos
  phrasesStudied: number;
  quizCorrect: number;
  quizWrong: number;
  activityType: ActivityType;
}

export interface UserProgress {
  phrases: Record<string, PhraseProgress>;
  sessions: StudySession[];
  totalTimeStudied: number; // em segundos
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalPhrasesStudied: number;
  totalQuizCorrect: number;
  totalQuizWrong: number;
}

const STORAGE_KEY = 'stardew-valley-progress';

const initialProgress: UserProgress = {
  phrases: {},
  sessions: [],
  totalTimeStudied: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastStudyDate: null,
  totalPhrasesStudied: 0,
  totalQuizCorrect: 0,
  totalQuizWrong: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialProgress;
      }
    }
    return initialProgress;
  });

  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [currentSession, setCurrentSession] = useState<Partial<StudySession>>({
    phrasesStudied: 0,
    quizCorrect: 0,
    quizWrong: 0,
  });

  // Salva no localStorage sempre que o progresso mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Calcula o streak baseado na última data de estudo
  const calculateStreak = useCallback((lastDate: string | null): number => {
    if (!lastDate) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last = new Date(lastDate);
    last.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - last.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Se estudou hoje ou ontem, mantém o streak
    if (diffDays <= 1) {
      return progress.currentStreak;
    }

    // Se passou mais de 1 dia, reseta o streak
    return 0;
  }, [progress.currentStreak]);

  // Inicia uma sessão de estudo
  const startSession = useCallback((activityType: ActivityType) => {
    setSessionStartTime(Date.now());
    setCurrentSession({
      activityType,
      phrasesStudied: 0,
      quizCorrect: 0,
      quizWrong: 0,
    });
  }, []);

  // Finaliza a sessão e salva
  const endSession = useCallback(() => {
    if (!sessionStartTime) return;

    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    const today = new Date().toISOString().split('T')[0];

    setProgress((prev) => {
      const currentStreak = calculateStreak(prev.lastStudyDate);
      const newStreak = prev.lastStudyDate === today ? currentStreak : currentStreak + 1;

      return {
        ...prev,
        sessions: [
          ...prev.sessions,
          {
            date: today,
            duration,
            phrasesStudied: currentSession.phrasesStudied || 0,
            quizCorrect: currentSession.quizCorrect || 0,
            quizWrong: currentSession.quizWrong || 0,
            activityType: currentSession.activityType || 'flashcard',
          },
        ],
        totalTimeStudied: prev.totalTimeStudied + duration,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastStudyDate: today,
      };
    });

    setSessionStartTime(null);
    setCurrentSession({
      phrasesStudied: 0,
      quizCorrect: 0,
      quizWrong: 0,
    });
  }, [sessionStartTime, currentSession, calculateStreak]);

  // Registra que uma frase foi estudada
  const studyPhrase = useCallback((phraseId: string) => {
    setProgress((prev) => {
      const existing = prev.phrases[phraseId] || {
        id: phraseId,
        timesStudied: 0,
        lastStudied: '',
        correctAnswers: 0,
        wrongAnswers: 0,
        mastery: 0,
      };

      return {
        ...prev,
        phrases: {
          ...prev.phrases,
          [phraseId]: {
            ...existing,
            timesStudied: existing.timesStudied + 1,
            lastStudied: new Date().toISOString(),
          },
        },
        totalPhrasesStudied: prev.totalPhrasesStudied + 1,
      };
    });

    setCurrentSession((prev) => ({
      ...prev,
      phrasesStudied: (prev.phrasesStudied || 0) + 1,
    }));
  }, []);

  // Registra uma resposta do quiz
  const answerQuiz = useCallback((phraseId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const existing = prev.phrases[phraseId] || {
        id: phraseId,
        timesStudied: 0,
        lastStudied: '',
        correctAnswers: 0,
        wrongAnswers: 0,
        mastery: 0,
      };

      const newCorrect = isCorrect ? existing.correctAnswers + 1 : existing.correctAnswers;
      const newWrong = !isCorrect ? existing.wrongAnswers + 1 : existing.wrongAnswers;
      const totalAttempts = newCorrect + newWrong;
      const mastery = totalAttempts > 0 ? Math.round((newCorrect / totalAttempts) * 100) : 0;

      return {
        ...prev,
        phrases: {
          ...prev.phrases,
          [phraseId]: {
            ...existing,
            correctAnswers: newCorrect,
            wrongAnswers: newWrong,
            mastery,
            lastStudied: new Date().toISOString(),
          },
        },
        totalQuizCorrect: prev.totalQuizCorrect + (isCorrect ? 1 : 0),
        totalQuizWrong: prev.totalQuizWrong + (!isCorrect ? 1 : 0),
      };
    });

    setCurrentSession((prev) => ({
      ...prev,
      quizCorrect: (prev.quizCorrect || 0) + (isCorrect ? 1 : 0),
      quizWrong: (prev.quizWrong || 0) + (!isCorrect ? 1 : 0),
    }));
  }, []);

  // Obtém o progresso de uma frase específica
  const getPhraseProgress = useCallback(
    (phraseId: string): PhraseProgress => {
      return (
        progress.phrases[phraseId] || {
          id: phraseId,
          timesStudied: 0,
          lastStudied: '',
          correctAnswers: 0,
          wrongAnswers: 0,
          mastery: 0,
        }
      );
    },
    [progress.phrases]
  );

  // Obtém estatísticas gerais
  const getStats = useCallback(() => {
    const phrasesArray = Object.values(progress.phrases);

    return {
      totalPhrases: phrasesArray.length,
      masteredPhrases: phrasesArray.filter((p) => p.mastery >= 80).length,
      learningPhrases: phrasesArray.filter((p) => p.mastery >= 40 && p.mastery < 80).length,
      newPhrases: phrasesArray.filter((p) => p.mastery < 40).length,
      averageMastery: phrasesArray.length > 0
        ? Math.round(phrasesArray.reduce((sum, p) => sum + p.mastery, 0) / phrasesArray.length)
        : 0,
      totalSessions: progress.sessions.length,
      totalTimeStudied: progress.totalTimeStudied,
      currentStreak: calculateStreak(progress.lastStudyDate),
      longestStreak: progress.longestStreak,
      quizAccuracy: progress.totalQuizCorrect + progress.totalQuizWrong > 0
        ? Math.round((progress.totalQuizCorrect / (progress.totalQuizCorrect + progress.totalQuizWrong)) * 100)
        : 0,
    };
  }, [progress, calculateStreak]);

  // Reseta todo o progresso
  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Obtém histórico de sessões (últimos 7 dias)
  const getRecentSessions = useCallback((days = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return progress.sessions
      .filter((session) => new Date(session.date) >= cutoffDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [progress.sessions]);

  return {
    progress,
    startSession,
    endSession,
    studyPhrase,
    answerQuiz,
    getPhraseProgress,
    getStats,
    resetProgress,
    getRecentSessions,
    sessionStartTime,
    currentSession,
  };
}
