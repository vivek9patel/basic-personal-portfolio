import { ExternalLink, Github, Linkedin } from 'lucide-react';
import type { LinkChipProps } from '@/lib/ask/component-schemas';

function LinkIcon({ kind }: { kind?: LinkChipProps['kind'] }) {
  if (kind === 'github') return <Github className="h-3.5 w-3.5" />;
  if (kind === 'linkedin') return <Linkedin className="h-3.5 w-3.5" />;
  return <ExternalLink className="h-3.5 w-3.5" />;
}

export function LinkChip({ label, href, kind = 'other' }: LinkChipProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-2 inline-flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 text-xs text-foreground shadow-[2px_2px_0px_0px_var(--border)] transition-colors hover:bg-accent"
    >
      <LinkIcon kind={kind} />
      {label}
    </a>
  );
}
