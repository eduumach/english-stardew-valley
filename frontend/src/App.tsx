import { useState, useEffect } from 'react';
import { phrases } from '@/data/phrases';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { CategoryFilter } from '@/components/navigation/CategoryFilter';
import { ModeSelector } from '@/components/navigation/ModeSelector';
import type { AppMode } from '@/components/navigation/ModeSelector';
import { ProgressTracker } from '@/components/progress/ProgressTracker';
import { ProgressDashboard } from '@/components/progress/ProgressDashboard';
import { FlashCard } from '@/components/flashcard/FlashCard';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizResult } from '@/components/quiz/QuizResult';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardDeck } from '@/hooks/useFlashcardDeck';
import { useQuizMode } from '@/hooks/useQuizMode';
import { useProgress } from '@/hooks/useProgress';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import { ThemeProvider } from '@/context/ThemeContext';

const STORAGE_KEY_MODE = 'stardew-app-mode';
const STORAGE_KEY_DASHBOARD = 'stardew-show-dashboard';

function App() {
  const [mode, setMode] = useState<AppMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_MODE);
    return (stored as AppMode) || 'study';
  });
  const [showResults, setShowResults] = useState(false);
  const [showDashboard, setShowDashboard] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_DASHBOARD);
    return stored === 'true';
  });

  const { updateProgress, getStats } = useFlashcardProgress();
  const {
    startSession,
    endSession,
    studyPhrase,
    answerQuiz,
    getStats: getProgressStats,
  } = useProgress();
  const {
    currentPhrase,
    currentIndex,
    totalCards,
    nextCard,
    prevCard,
    selectedCategory,
    changeCategory,
    filteredPhrases,
  } = useFlashcardDeck(phrases);

  const {
    options,
    selectedAnswer,
    hasAnswered,
    correctCount,
    wrongCount,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizMode(currentPhrase, filteredPhrases);

  const stats = getStats();
  const progressStats = getProgressStats();

  // Inicia sessão quando o modo muda
  useEffect(() => {
    startSession(mode === 'study' ? 'flashcard' : 'quiz');
  }, [mode, startSession]);

  // Finaliza sessão ao desmontar
  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  // Salva o modo no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  }, [mode]);

  // Salva o estado do dashboard no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DASHBOARD, showDashboard.toString());
  }, [showDashboard]);

  const handleMarkLearned = () => {
    if (currentPhrase) {
      updateProgress(currentPhrase.id, 'learned');
      studyPhrase(currentPhrase.id);
      nextCard();
    }
  };

  const handleMarkReview = () => {
    if (currentPhrase) {
      updateProgress(currentPhrase.id, 'learning');
      studyPhrase(currentPhrase.id);
      nextCard();
    }
  };

  const handleQuizNext = () => {
    if (currentPhrase && hasAnswered && selectedAnswer !== null) {
      const isCorrect = options[selectedAnswer].isCorrect;
      answerQuiz(currentPhrase.id, isCorrect);
    }
    nextQuestion();
    nextCard();
  };

  const handleResetQuiz = () => {
    resetQuiz();
    setShowResults(false);
  };

  if (!currentPhrase) {
    return (
      <Container>
        <Header />
        <div className="text-center text-muted-foreground">
          Nenhuma frase disponível nesta categoria.
        </div>
      </Container>
    );
  }

  return (
    <ThemeProvider>
      <Container>
        <Header />

        <div className="space-y-6">
          {/* Botão para alternar dashboard */}
          <div className="flex justify-end">
            <Button
              variant={showDashboard ? 'default' : 'outline'}
              onClick={() => setShowDashboard(!showDashboard)}
              className="pixel-button"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {showDashboard ? 'Ocultar Dashboard' : 'Ver Dashboard'}
            </Button>
          </div>

          {showDashboard && (
            <>
              <ProgressDashboard stats={progressStats} />
              <Separator />
            </>
          )}

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={changeCategory}
          />

          <Separator />

          <ModeSelector mode={mode} onModeChange={setMode} />

          <Separator />

          <ProgressTracker
            learned={stats.learned}
            learning={stats.learning}
            newCount={stats.new}
            total={phrases.length}
          />

          <Separator />

          {mode === 'study' ? (
            <FlashCard
              phrase={currentPhrase}
              currentIndex={currentIndex}
              totalCards={totalCards}
              onMarkLearned={handleMarkLearned}
              onMarkReview={handleMarkReview}
              onPrevious={prevCard}
              onNext={nextCard}
            />
          ) : (
            <>
              <QuizCard
                phrase={currentPhrase}
                options={options}
                selectedAnswer={selectedAnswer}
                hasAnswered={hasAnswered}
                correctCount={correctCount}
                wrongCount={wrongCount}
                onSelectAnswer={selectAnswer}
                onNext={handleQuizNext}
                onShowResults={() => setShowResults(true)}
              />
              <QuizResult
                isOpen={showResults}
                correctCount={correctCount}
                wrongCount={wrongCount}
                onClose={() => setShowResults(false)}
                onReset={handleResetQuiz}
              />
            </>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;

