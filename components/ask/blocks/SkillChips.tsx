import { Badge } from '@/components/ui/badge';
import type { SkillChipsProps } from '@/lib/ask/component-schemas';

export function SkillChips({ label, skills }: SkillChipsProps) {
  return (
    <div className="my-3 space-y-2">
      {label && (
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {skills.map(skill => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
