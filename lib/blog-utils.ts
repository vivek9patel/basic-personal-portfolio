import type { Post, PostSummary } from '@/interfaces/post.interface';

export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function groupPostsByYear(
  posts: PostSummary[]
): Record<string, PostSummary[]> {
  return posts.reduce<Record<string, PostSummary[]>>((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});
}

export function getRelatedPosts(
  current: Post | PostSummary,
  allPosts: PostSummary[],
  limit = 3
): PostSummary[] {
  return allPosts
    .filter(post => post.slug !== current.slug)
    .map(post => {
      const overlap = post.tags.filter(tag =>
        current.tags.includes(tag)
      ).length;
      return { post, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return (
        new Date(b.post.publishedAt).getTime() -
        new Date(a.post.publishedAt).getTime()
      );
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
