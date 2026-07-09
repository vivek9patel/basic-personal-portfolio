import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export function useSectionView<T extends HTMLElement>(section: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('section_view', { section });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [section]);

  return ref;
}
