import { type ReactNode } from 'react';
import { AnimatedSection } from '@/components/animated-section';
import { cn } from '@/lib/utils';

interface StickySidebarProps {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function StickySidebar({
  children,
  footer,
  className,
}: StickySidebarProps) {
  return (
    <aside
      className={cn(
        'sticky top-24 z-30 hidden h-[calc(100dvh-6rem)] w-40 shrink-0 self-start justify-self-end pr-6 lg:block',
        className
      )}
    >
      <div className="relative h-full">
        <div
          className={cn(
            'absolute inset-x-0 top-0 overflow-y-auto overscroll-contain scrollbar-hide',
            footer ? 'bottom-9' : 'bottom-0'
          )}
        >
          <AnimatedSection variant="fade">{children}</AnimatedSection>
        </div>
        {footer ? (
          <div className="absolute inset-x-0 bottom-0">
            <AnimatedSection variant="fade" delay={80}>
              {footer}
            </AnimatedSection>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
