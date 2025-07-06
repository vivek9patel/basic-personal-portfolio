import { ReactNode } from 'react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { formatDate } from '@/lib/blog';

interface BlogLayoutProps {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  children: ReactNode;
}

export function BlogLayout({
  title,
  description,
  publishedAt,
  tags,
  children,
}: BlogLayoutProps) {
  return (
    <article className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
          {title}
        </h1>

        {description && (
          <p className="text-xl text-muted-foreground mb-4">{description}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <time
            dateTime={publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(publishedAt)}
          </time>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />
      </header>

      {/* Content */}
      <div className="max-w-none">{children}</div>
    </article>
  );
}
