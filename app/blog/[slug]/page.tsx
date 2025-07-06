import { getAllBlogSlugs, getBlogPost, formatDate } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: 'Your Name' }],
    openGraph: {
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
    },
    keywords: post.tags,
  };
}

// Simple markdown to HTML converter for build compatibility
function simpleMarkdownToHtml(markdown: string): string {
  return markdown
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-4xl font-bold tracking-tight mb-6 text-foreground">$1</h1>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-3xl font-semibold tracking-tight mb-4 mt-8 text-foreground">$1</h2>'
    )
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-2xl font-semibold tracking-tight mb-3 mt-6 text-foreground">$1</h3>'
    )
    .replace(/^\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
    .replace(/^\*(.*)\*/gim, '<em class="italic">$1</em>')
    .replace(
      /```(\w+)?\n([\s\S]*?)```/gim,
      '<pre class="p-4 mb-4 bg-muted rounded-lg overflow-x-auto"><code class="text-sm">$2</code></pre>'
    )
    .replace(
      /`([^`]+)`/gim,
      '<code class="px-2 py-1 bg-muted text-muted-foreground rounded text-sm font-mono">$1</code>'
    )
    .replace(/^\- (.*$)/gim, '<li class="mb-1 leading-relaxed">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-1 leading-relaxed">$2</li>')
    .replace(/\n\n/gim, '</p><p class="mb-4 text-foreground leading-relaxed">')
    .replace(
      /^(.*)$/gim,
      '<p class="mb-4 text-foreground leading-relaxed">$1</p>'
    )
    .replace(/<p class="mb-4 text-foreground leading-relaxed"><\/p>/gim, '')
    .replace(
      /(<li.*<\/li>)/gim,
      '<ul class="mb-4 pl-6 list-disc text-foreground">$1</ul>'
    );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Convert markdown content to HTML
  const htmlContent = simpleMarkdownToHtml(post.content);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-muted-foreground mb-4">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <time
            dateTime={post.publishedAt}
            className="text-sm text-muted-foreground"
          >
            {formatDate(post.publishedAt)}
          </time>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <hr className="border-border" />
      </header>

      {/* Content */}
      <div className="max-w-none">
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
