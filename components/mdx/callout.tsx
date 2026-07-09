interface CalloutProps {
  type?: 'note' | 'tip' | 'warning';
  children: React.ReactNode;
}

export function Callout({ type = 'note', children }: CalloutProps) {
  const label = { note: 'Note', tip: 'Tip', warning: 'Warning' }[type];

  return (
    <div className="border border-border rounded-lg p-4 bg-muted space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="text-sm text-foreground leading-relaxed">{children}</div>
    </div>
  );
}
