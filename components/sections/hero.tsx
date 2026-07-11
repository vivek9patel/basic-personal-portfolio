import { useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import CompanyName from '@/components/CompanyName';
import { SOCIAL_LINKS } from '@/data/social-links';
import { HERO } from '@/data/hero';
import { trackOutboundClick } from '@/lib/analytics';
import { useSectionView } from '@/hooks/useSectionView';
import { cn } from '@/lib/utils';

const GitHubStats = dynamic(() => import('@/components/GitHubStats'), {
  ssr: false,
});

function SocialIcon({
  name,
  className,
}: {
  name: 'github' | 'linkedin' | 'twitter';
  className?: string;
}) {
  if (name === 'github') return <Github className={className} />;
  if (name === 'linkedin') return <Linkedin className={className} />;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useSectionView<HTMLElement>('hero');
  const [titleInView, setTitleInView] = useState(true);

  useEffect(() => {
    const title = document.getElementById('hero-title');
    if (!title) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTitleInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '-20px 0px 0px 0px' }
    );

    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="space-y-6 scroll-mt-24">
      <h1
        id="hero-title"
        className={cn(
          'text-4xl md:text-5xl font-bold tracking-tight text-foreground transition-all duration-500 ease-out',
          !titleInView && 'opacity-0 -translate-y-2'
        )}
      >
        Hey, I&apos;m Vivek.
      </h1>
      <div className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
        <p>
          <em className="text-foreground">{HERO.lead}</em> {HERO.experience}
          <span className="block mt-4">
            Currently at <CompanyName name="HubSpot" />, {HERO.current}
          </span>
        </p>
      </div>
      <GitHubStats username="vivek9patel" />
      <div className="flex flex-wrap items-center gap-2 lg:hidden">
        {SOCIAL_LINKS.map(link =>
          link.icon === 'mail' ? (
            <a
              key={link.id}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
              data-cursor={true}
              onClick={() => trackOutboundClick('email', 'hero')}
            >
              {link.label}
            </a>
          ) : (
            <Button key={link.id} variant="ghost" size="sm" asChild>
              <a
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
                data-cursor={true}
                onClick={() =>
                  trackOutboundClick(
                    link.icon === 'github'
                      ? 'github'
                      : link.icon === 'linkedin'
                        ? 'linkedin'
                        : 'twitter',
                    'hero'
                  )
                }
              >
                <SocialIcon name={link.icon} className="mr-2 h-4 w-4" />
                {link.label}
              </a>
            </Button>
          )
        )}
      </div>
    </section>
  );
}
