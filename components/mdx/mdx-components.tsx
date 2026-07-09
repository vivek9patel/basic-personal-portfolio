import type { ComponentPropsWithoutRef } from 'react';
import { Callout } from '@/components/mdx/callout';
import { Media } from '@/components/mdx/media';

export const mdxComponents = {
  Callout,
  Media,
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      {...props}
      className="bg-muted border border-border rounded-lg p-4 overflow-x-auto text-sm font-mono"
    />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code {...props} className="font-mono text-sm" />
  ),
};
