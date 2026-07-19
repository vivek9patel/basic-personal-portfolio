import type { FormEvent, RefObject } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type AskComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onStop: () => void;
  isRunning: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  className?: string;
  autoFocus?: boolean;
};

export function AskComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  isRunning,
  inputRef,
  className,
  autoFocus,
}: AskComposerProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form
      className={cn(
        'flex w-full items-center gap-2 border border-border bg-card p-2 shadow-[4px_4px_0px_0px_var(--border)]',
        className
      )}
      onSubmit={handleSubmit}
    >
      <Input
        ref={inputRef}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder="Ask about experience, projects, fit…"
        disabled={isRunning}
        autoFocus={autoFocus}
        className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      {isRunning ? (
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={onStop}
          aria-label="Stop"
          data-cursor="true"
        >
          <Square className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          size="icon"
          disabled={!value.trim()}
          aria-label="Send"
          data-cursor="true"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
}
