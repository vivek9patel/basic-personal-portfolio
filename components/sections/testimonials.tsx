import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TESTIMONIALS } from '@/data/testimonials';
import { Testimonial } from '@/interfaces/testimonial.interface';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { useSectionView } from '@/hooks/useSectionView';

const LONG_QUOTE_THRESHOLD = 220;

function authorMeta(testimonial: Testimonial) {
  return [testimonial.role, testimonial.company].filter(Boolean).join(' · ');
}

function AuthorBlock({ testimonial: t }: { testimonial: Testimonial }) {
  const meta = authorMeta(t);

  return (
    <div className="space-y-0.5">
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
        <p className="font-medium text-foreground">{t.author}</p>
      )}
      {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
    </div>
  );
}

function TestimonialCard({
  testimonial: t,
  onReadMore,
}: {
  testimonial: Testimonial;
  onReadMore: () => void;
}) {
  const isLong = t.quote.length > LONG_QUOTE_THRESHOLD;

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
      <AuthorBlock testimonial={t} />

      <div className="relative mt-4 flex-1">
        <blockquote
          className={cn(
            'text-sm leading-relaxed text-muted-foreground whitespace-pre-line',
            isLong && 'line-clamp-5'
          )}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        {isLong && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent"
            aria-hidden
          />
        )}
      </div>

      {isLong && (
        <button
          type="button"
          onClick={onReadMore}
          className="mt-3 w-fit text-sm font-medium text-primary hover:underline"
          data-cursor={true}
        >
          Read full recommendation
        </button>
      )}
    </article>
  );
}

function TestimonialDialog({
  testimonial,
  open,
  onOpenChange,
}: {
  testimonial: Testimonial | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!testimonial) {
    return null;
  }

  const meta = authorMeta(testimonial);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {testimonial.linkedinUrl ? (
              <a
                href={testimonial.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                data-cursor={true}
              >
                {testimonial.author}
              </a>
            ) : (
              testimonial.author
            )}
          </DialogTitle>
          {meta && <DialogDescription>{meta}</DialogDescription>}
        </DialogHeader>
        <blockquote className="border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </DialogContent>
    </Dialog>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useSectionView<HTMLElement>('testimonials');
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);

  if (TESTIMONIALS.length === 0) {
    return null;
  }

  const sorted = [...TESTIMONIALS].sort((a, b) => a.priority - b.priority);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="space-y-6 scroll-mt-24"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        What Colleagues Have to Say
      </h2>
      <div className="relative overflow-x-clip">
        <div className="flex items-start gap-4 overflow-x-auto pb-4 snap-x snap-mandatory custom-scroll-bar-x">
          {sorted.map(t => (
            <div
              key={t.id}
              className="w-72 shrink-0 snap-start sm:w-80 md:w-96"
            >
              <TestimonialCard
                testimonial={t}
                onReadMore={() => {
                  trackEvent('testimonial_expand', {
                    author: t.author,
                    testimonial_id: t.id,
                  });
                  setActiveTestimonial(t);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <TestimonialDialog
        testimonial={activeTestimonial}
        open={activeTestimonial !== null}
        onOpenChange={open => {
          if (!open) {
            setActiveTestimonial(null);
          }
        }}
      />
    </section>
  );
}
