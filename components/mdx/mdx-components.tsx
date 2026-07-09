import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { Callout } from '@/components/mdx/callout';
import { Media } from '@/components/mdx/media';

function isHighlightedCode(props: ComponentPropsWithoutRef<'code'>) {
  return Boolean((props as Record<string, unknown>)['data-language']);
}

export const mdxComponents = {
  Callout,
  Media,
  figure: (props: ComponentPropsWithoutRef<'figure'>) => (
    <figure
      {...props}
      className={cn(
        'my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4',
        props.className
      )}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      {...props}
      className={cn(
        'overflow-x-auto text-sm font-mono leading-relaxed',
        'data-language' in props
          ? 'm-0 bg-transparent p-0'
          : 'rounded-lg border border-border bg-muted p-4',
        props.className
      )}
    />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      {...props}
      className={cn(
        'font-mono text-sm',
        isHighlightedCode(props)
          ? 'bg-transparent'
          : 'rounded bg-muted px-1 py-0.5',
        props.className
      )}
    />
  ),
};
