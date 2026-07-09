import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

function bucketTimeOnPage(seconds: number): string {
  if (seconds < 30) return 'under_30s';
  if (seconds < 120) return '30s_to_2m';
  return 'over_2m';
}

export function useBlogScrollDepth(
  slug: string,
  contentSelector = '#post-content'
): void {
  useEffect(() => {
    const fired = new Set<number>();
    const startTime = Date.now();
    const content = document.querySelector(contentSelector);

    const measureScroll = () => {
      if (!content) return;

      const rect = content.getBoundingClientRect();
      const contentTop = rect.top + window.scrollY;
      const contentHeight = content.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const scrolled = viewportBottom - contentTop;
      const percent = Math.min(
        100,
        Math.max(0, (scrolled / contentHeight) * 100)
      );

      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent('blog_scroll_depth', { slug, depth: threshold });
        }
      }
    };

    window.addEventListener('scroll', measureScroll, { passive: true });
    measureScroll();

    return () => {
      window.removeEventListener('scroll', measureScroll);
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      trackEvent('blog_time_on_page', {
        slug,
        time_bucket: bucketTimeOnPage(seconds),
        max_scroll_depth: fired.size > 0 ? Math.max(...Array.from(fired)) : 0,
      });
    };
  }, [slug, contentSelector]);
}
