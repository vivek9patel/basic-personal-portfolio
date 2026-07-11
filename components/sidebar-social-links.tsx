import { Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/social-links';
import { trackOutboundClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const SIDEBAR_SOCIAL_ORDER = ['twitter', 'linkedin', 'github'] as const;

const SIDEBAR_SOCIALS = SIDEBAR_SOCIAL_ORDER.map(id =>
  SOCIAL_LINKS.find(link => link.id === id)
).filter(
  (
    link
  ): link is (typeof SOCIAL_LINKS)[number] & {
    icon: 'github' | 'linkedin' | 'twitter';
  } => link !== undefined && link.icon !== 'mail'
);

function SocialIcon({
  name,
  className,
}: {
  name: 'github' | 'linkedin' | 'twitter';
  className?: string;
}) {
  if (name === 'github')
    return <Github className={className} strokeWidth={1.75} />;
  if (name === 'linkedin')
    return <Linkedin className={className} strokeWidth={1.75} />;
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

export function SidebarSocialLinks({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Social links"
      className={cn('flex items-center gap-1', className)}
    >
      {SIDEBAR_SOCIALS.map(link => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="inline-flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted hover:text-foreground"
          data-cursor={true}
          onClick={() =>
            trackOutboundClick(
              link.icon === 'github'
                ? 'github'
                : link.icon === 'linkedin'
                  ? 'linkedin'
                  : 'twitter',
              'sidebar'
            )
          }
        >
          <SocialIcon name={link.icon} className="size-[18px]" />
        </a>
      ))}
    </nav>
  );
}
