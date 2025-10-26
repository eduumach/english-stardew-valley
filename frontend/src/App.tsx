import { useState } from 'react';
import { phrases } from '@/data/phrases';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { CategoryFilter } from '@/components/navigation/CategoryFilter';
import { ModeSelector } from '@/components/navigation/ModeSelector';
import type { AppMode } from '@/components/navigation/ModeSelector';
import { ProgressTracker } from '@/components/progress/ProgressTracker';
import { FlashCard } from '@/components/flashcard/FlashCard';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizResult } from '@/components/quiz/QuizResult';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { useFlashcardDeck } from '@/hooks/useFlashcardDeck';
import { useQuizMode } from '@/hooks/useQuizMode';
import { Separator } from '@/components/ui/separator';

function App() {
  const [mode, setMode] = useState<AppMode>('study');
  const [showResults, setShowResults] = useState(false);

  const { updateProgress, getStats } = useFlashcardProgress();
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

  const handleMarkLearned = () => {
    if (currentPhrase) {
      updateProgress(currentPhrase.id, 'learned');
      nextCard();
    }
  };

  const handleMarkReview = () => {
    if (currentPhrase) {
      updateProgress(currentPhrase.id, 'learning');
      nextCard();
    }
  };

  const handleQuizNext = () => {
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
    <Container>
      <Header />

      <div className="space-y-6">
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
  );
}

export default App;

