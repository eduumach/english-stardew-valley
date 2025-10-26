import { Sprout } from 'lucide-react';

export function Header() {
  return (
    <div className="mb-8 text-center">
      <div className="mb-4 flex items-center justify-center gap-3">
        <Sprout className="h-10 w-10 text-primary" strokeWidth={2.5} />
        <h1 className="pixel-title text-2xl text-primary md:text-4xl">
          Stardew English
        </h1>
        <Sprout className="h-10 w-10 text-primary" strokeWidth={2.5} />
      </div>
      <p className="text-sm text-muted-foreground md:text-base">
        Aprenda inglês com frases do Stardew Valley
      </p>
    </div>
  );
}
