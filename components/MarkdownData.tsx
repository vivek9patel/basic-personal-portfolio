import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export default function MarkdownData({
  content,
}: {
  content: MDXRemoteSerializeResult;
}) {
  return (
    <div className="prose prose-xl prose-a:text-primary">
      <MDXRemote {...content} />
    </div>
  );
}
