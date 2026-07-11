import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'fade';
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = 'up',
}: AnimatedSectionProps) {
  return (
    <div
      className={cn(
        variant === 'fade' ? 'ease-fade-on-load' : 'ease-up-on-load',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
