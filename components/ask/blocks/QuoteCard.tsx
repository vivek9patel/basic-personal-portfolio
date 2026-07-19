import { TESTIMONIALS } from '@/data/testimonials';
import type { QuoteCardProps } from '@/lib/ask/component-schemas';

function truncate(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars - 1).trimEnd()}…`;
}

export function QuoteCard({
  testimonialId,
  quote,
  author,
  role,
  company,
  maxChars = 280,
}: QuoteCardProps) {
  const entry = testimonialId
    ? TESTIMONIALS.find(t => t.id === testimonialId)
    : undefined;

  const body = truncate(entry?.quote ?? quote ?? '', maxChars);
  if (!body) return null;

  const bylineAuthor = entry?.author ?? author;
  const bylineRole = entry?.role ?? role;
  const bylineCompany = entry?.company ?? company;

  return (
    <blockquote className="my-3 border border-border bg-card p-4 shadow-[3px_3px_0px_0px_var(--border)]">
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{body}&rdquo;
      </p>
      {(bylineAuthor || bylineRole || bylineCompany) && (
        <footer className="mt-3 text-xs text-foreground">
          {bylineAuthor && <span className="font-medium">{bylineAuthor}</span>}
          {(bylineRole || bylineCompany) && (
            <span className="text-muted-foreground">
              {bylineAuthor ? ' · ' : ''}
              {[bylineRole, bylineCompany].filter(Boolean).join(', ')}
            </span>
          )}
        </footer>
      )}
    </blockquote>
  );
}
