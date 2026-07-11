import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { type ReactNode } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
}

export function AnimatedPage({ children }: AnimatedPageProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('ease-fade-on-load');

    const onEnd = () => {
      el.classList.remove('ease-fade-on-load');
    };

    el.addEventListener('animationend', onEnd, { once: true });
    return () => el.removeEventListener('animationend', onEnd);
  }, [router.asPath]);

  return (
    <div ref={ref} key={router.asPath}>
      {children}
    </div>
  );
}
