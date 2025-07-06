import Link from 'next/link';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { formatDate } from '@/lib/blog';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
}

export function BlogCard({
  slug,
  title,
  description,
  publishedAt,
  tags,
}: BlogCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold leading-tight">
              <Link
                href={`/blog/${slug}`}
                className="hover:text-primary transition-colors"
              >
                {title}
              </Link>
            </CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              {formatDate(publishedAt)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {description && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link
          href={`/blog/${slug}`}
          className="text-sm text-primary hover:underline font-medium"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
}
