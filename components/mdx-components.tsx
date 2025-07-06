import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

// Custom components for MDX
const components: MDXComponents = {
  // Override default HTML elements
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight mb-6 text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold tracking-tight mb-4 mt-8 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold tracking-tight mb-3 mt-6 text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold tracking-tight mb-2 mt-4 text-foreground">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-lg font-semibold tracking-tight mb-2 mt-4 text-foreground">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="text-base font-semibold tracking-tight mb-2 mt-4 text-foreground">
      {children}
    </h6>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-foreground leading-relaxed">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || '#'}
      className="text-primary hover:underline font-medium"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 pl-6 list-disc text-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 pl-6 list-decimal text-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1 leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 italic text-muted-foreground bg-muted/50 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="p-4 mb-4 bg-muted rounded-lg overflow-x-auto">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border px-4 py-2 bg-muted text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2">{children}</td>
  ),
  hr: () => <Separator className="my-8" />,
  // Custom components available in MDX
  Image: ({ src, alt, width, height, className }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-lg ${className || ''}`}
    />
  ),
  Badge,
  Separator,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

export default components;
