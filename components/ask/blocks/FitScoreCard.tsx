import type { FitScoreProps } from '@/lib/ask/component-schemas';

export function FitScoreCard({
  role,
  score,
  summary,
  dimensions = [],
}: FitScoreProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <div className="my-3 border border-border bg-card p-4 shadow-[3px_3px_0px_0px_var(--border)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Fit for
          </p>
          <h3 className="text-sm font-semibold text-foreground">{role}</h3>
        </div>
        <p className="text-3xl font-semibold tracking-tight text-primary">
          {clamped}
          <span className="text-base text-muted-foreground">%</span>
        </p>
      </div>

      <div className="mt-3 h-2 w-full border border-border bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>

      {summary && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {summary}
        </p>
      )}

      {dimensions.length > 0 && (
        <div className="mt-4 space-y-2">
          {dimensions.map(dimension => {
            const dimScore = Math.max(
              0,
              Math.min(100, Math.round(dimension.score))
            );
            return (
              <div key={dimension.name} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">
                    {dimension.name}
                  </span>
                  <span className="text-foreground">{dimScore}</span>
                </div>
                <div className="h-1.5 w-full bg-muted">
                  <div
                    className="h-full bg-foreground/70"
                    style={{ width: `${dimScore}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
