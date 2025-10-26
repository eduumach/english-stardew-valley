import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {children}
      </div>
    </div>
  );
}
