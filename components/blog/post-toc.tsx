import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface PostTocProps {
  contentId?: string;
}

export function PostToc({ contentId = 'post-content' }: PostTocProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const content = document.getElementById(contentId);
    if (!content) return;

    const elements = Array.from(
      content.querySelectorAll<HTMLElement>('h2[id], h3[id]')
    );

    const parsed = elements.map(el => ({
      id: el.id,
      text: el.textContent ?? '',
      level: (el.tagName === 'H2' ? 2 : 3) as 2 | 3,
    }));

    setHeadings(parsed);

    if (parsed.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [contentId]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-1">
      <p className="mb-4 text-sm font-medium text-foreground">On this page</p>
      {headings.map(heading => {
        const isActive = activeId === heading.id;
        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'group flex items-center gap-3 py-1.5 text-sm transition-colors',
              heading.level === 3 && 'pl-3',
              isActive
                ? 'font-medium text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            data-cursor={true}
          >
            <span
              className={cn(
                'h-px shrink-0 bg-foreground transition-all duration-300',
                isActive
                  ? 'w-8'
                  : 'w-4 bg-muted-foreground/50 group-hover:w-6 group-hover:bg-foreground/60'
              )}
              aria-hidden
            />
            <span className="min-w-0 leading-snug break-words">
              {heading.text}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
