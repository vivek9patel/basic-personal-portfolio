import { Github, Linkedin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import CompanyName from '@/components/CompanyName';
import { SOCIAL_LINKS } from '@/data/social-links';
import { HERO } from '@/data/hero';
import { trackOutboundClick } from '@/lib/analytics';
import { useSectionView } from '@/hooks/useSectionView';

const GitHubStats = dynamic(() => import('@/components/GitHubStats'), {
  ssr: false,
});

function SocialIcon({
  name,
  className,
}: {
  name: 'github' | 'linkedin';
  className?: string;
}) {
  if (name === 'github') return <Github className={className} />;
  return <Linkedin className={className} />;
}

export default function HeroSection() {
  const sectionRef = useSectionView<HTMLElement>('hero');

  return (
    <section ref={sectionRef} className="space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
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
      <div className="flex flex-wrap items-center gap-2">
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
                    link.icon === 'github' ? 'github' : 'linkedin',
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
