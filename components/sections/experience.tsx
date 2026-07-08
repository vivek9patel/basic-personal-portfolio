import { Badge } from '@/components/ui/badge';
import CompanyName from '@/components/CompanyName';
import { EXPERIENCE } from '@/data/experience';

export default function ExperienceSection() {
  const sorted = [...EXPERIENCE].sort((a, b) => a.priority - b.priority);

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Experience
      </h2>
      <div className="relative ml-3 border-l border-border pl-8 space-y-10">
        {sorted.map(entry => (
          <div key={entry.id} className="relative">
            <span
              className="absolute -left-10 top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background"
              aria-hidden="true"
            />
            <div className="space-y-3">
              <h3 className="text-base font-semibold">
                <CompanyName name={entry.company} />
                <span className="font-normal text-muted-foreground">
                  , {entry.role}
                </span>
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                {entry.highlights.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {entry.stack && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.stack.map(tech => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
