import type { StatCardProps } from '@/lib/ask/component-schemas';

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="my-3 inline-flex min-w-[9rem] flex-col border border-border bg-card px-4 py-3 shadow-[3px_3px_0px_0px_var(--border)]">
      <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
