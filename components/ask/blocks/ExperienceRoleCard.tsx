import { Badge } from '@/components/ui/badge';
import CompanyLogo from '@/components/company-logo';
import CompanyName from '@/components/CompanyName';
import { EXPERIENCE } from '@/data/experience';
import { cn } from '@/lib/utils';
import type { ExperienceRoleProps } from '@/lib/ask/component-schemas';

export function ExperienceRoleCard({
  experienceId,
  emphasize = false,
  maxHighlights = 2,
}: ExperienceRoleProps) {
  const entry = EXPERIENCE.find(e => e.id === experienceId);
  if (!entry) return null;

  const isCurrent = EXPERIENCE[0]?.id === entry.id;
  const highlights = entry.highlights.slice(0, maxHighlights);

  return (
    <div
      className={cn(
        'my-3 border border-border bg-card p-4 shadow-[3px_3px_0px_0px_var(--border)]',
        emphasize && 'border-primary'
      )}
    >
      <div className="flex gap-3">
        <CompanyLogo
          id={entry.id}
          company={entry.company}
          size={36}
          className="mt-0.5"
        />
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <p className="text-sm font-semibold text-foreground">
              <CompanyName name={entry.company} expandCursor={false} />
              <span className="font-normal text-muted-foreground">
                , {entry.role}
              </span>
            </p>
            {isCurrent && (
              <p className="mt-0.5 text-xs text-primary">Current</p>
            )}
          </div>
          <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
            {highlights.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          {entry.stack && (
            <div className="flex flex-wrap gap-1">
              {entry.stack.map(tech => (
                <Badge key={tech} variant="outline" className="text-[10px]">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
