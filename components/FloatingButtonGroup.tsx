import React from 'react';
import { cn } from '@/lib/utils';
import LikeCounter from './LikeCounter';
import AskTarsButton from './AskTarsButton';
import FloatingThemeSelectorLazy from './FloatingThemeSelectorLazy';

interface FloatingButtonGroupProps {
  currentLink: string;
  className?: string;
}

export const FloatingButtonGroup: React.FC<FloatingButtonGroupProps> = ({
  currentLink,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'select-none z-30 fixed right-2 md:right-12 top-1/4',
        'flex flex-col items-center gap-6 md:gap-10',
        className
      )}
    >
      {/* Like Counter - Top */}
      <LikeCounter />

      {/* Floating Theme Selector - Middle */}
      <FloatingThemeSelectorLazy />

      {/* Ask Tars Button - Bottom */}
      <AskTarsButton currentLink={currentLink} />
    </div>
  );
};

export default FloatingButtonGroup;
