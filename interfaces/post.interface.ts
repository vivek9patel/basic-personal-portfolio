import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface PostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  draft: boolean;
  coverImage?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  readingTimeMinutes: number;
  content: MDXRemoteSerializeResult;
  plainText: string;
}

export type PostSummary = Omit<Post, 'content' | 'plainText'>;
