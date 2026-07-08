import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TESTIMONIALS } from '@/data/testimonials';
import { Testimonial } from '@/interfaces/testimonial.interface';

const PREVIEW_LENGTH = 180;

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.quote.length > PREVIEW_LENGTH;
  const displayQuote =
    !expanded && isLong
      ? `${t.quote.slice(0, PREVIEW_LENGTH).trim()}…`
      : t.quote;

  return (
    <Card className="h-full border border-border bg-card hover:border-foreground/20">
      <CardContent className="flex h-full flex-col pt-6 space-y-3">
        <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          &ldquo;{displayQuote}&rdquo;
        </blockquote>
        {isLong && (
          <Button
            variant="link"
            size="sm"
            className="h-auto w-fit p-0 text-primary"
            onClick={() => setExpanded(!expanded)}
            data-cursor={true}
          >
            {expanded ? 'Show less' : 'Read more'}
          </Button>
        )}
        <div className="text-sm text-muted-foreground pt-2 border-t border-border">
          {t.linkedinUrl ? (
            <a
              href={t.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground hover:underline"
              data-cursor={true}
            >
              {t.author}
            </a>
          ) : (
            <span className="font-medium text-foreground">{t.author}</span>
          )}
          {t.role && <>, {t.role}</>}
          {t.company && <> · {t.company}</>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) {
    return null;
  }

  const sorted = [...TESTIMONIALS].sort((a, b) => a.priority - b.priority);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        What Colleagues Have to Say
      </h2>
      <div className="relative -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scroll-bar-x">
          {sorted.map(t => (
            <div
              key={t.id}
              className="snap-start shrink-0 w-72 sm:w-80 md:w-96"
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
