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
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [contentId]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <p className="text-sm font-medium text-foreground">On this page</p>
      <ul className="space-y-2 border-t border-border pt-3">
        {headings.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm leading-snug transition-colors',
                heading.level === 3 && 'pl-3',
                activeId === heading.id
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              data-cursor={true}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
