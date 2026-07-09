import Link from 'next/link';
import LikeCounter from '@/components/LikeCounter';
import { SOCIAL_LINKS } from '@/data/social-links';

const linkedInUrl =
  SOCIAL_LINKS.find(link => link.id === 'linkedin')?.href ??
  'https://www.linkedin.com/in/vivek9patel/';

export default function FooterSection() {
  return (
    <footer className="border-t border-border pt-8 flex flex-col items-center gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <Link href="/blog" passHref>
        <a
          className="text-sm text-muted-foreground hover:text-foreground hover:underline sm:order-last"
          data-cursor={true}
        >
          Writing
        </a>
      </Link>
      <span className="leading-relaxed">
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
