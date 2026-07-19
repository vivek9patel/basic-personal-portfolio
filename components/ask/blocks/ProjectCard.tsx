import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';
import type { ProjectCardProps } from '@/lib/ask/component-schemas';

export function ProjectCard({
  projectId,
  emphasize = false,
}: ProjectCardProps) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  return (
    <div
      className={cn(
        'my-3 border border-border bg-card p-4 shadow-[3px_3px_0px_0px_var(--border)]',
        emphasize && 'border-primary'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <Badge variant="outline" className="text-[10px]">
            {project.metric.label}
          </Badge>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
