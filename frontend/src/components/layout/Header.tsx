import { Sprout } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex items-center justify-center gap-3">
          <Sprout className="h-10 w-10 text-primary" strokeWidth={2.5} />
          <h1 className="pixel-title text-2xl text-primary md:text-4xl">
            Stardew English
          </h1>
          <Sprout className="h-10 w-10 text-primary" strokeWidth={2.5} />
        </div>
        <div className="flex flex-1 justify-end">
          <ThemeToggle />
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground md:text-base">
        Aprenda inglês com frases do Stardew Valley
      </p>
    </div>
  );
}
