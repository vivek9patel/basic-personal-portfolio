import LikeCounter from '@/components/LikeCounter';
import { SOCIAL_LINKS } from '@/data/social-links';

const linkedInUrl =
  SOCIAL_LINKS.find(link => link.id === 'linkedin')?.href ??
  'https://www.linkedin.com/in/vivek9patel/';

export default function FooterSection() {
  return (
    <footer className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted-foreground">
      <span>
        ❤️ Thanks for stopping by. Drop by to say hi{' '}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline"
          data-cursor={true}
        >
          here
        </a>
        .
      </span>
      <LikeCounter />
    </footer>
  );
}
