import { Package, Puzzle, Shield, Star, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Project } from '@/interfaces/project.interface';
import { trackProjectClick, type ProjectLocation } from '@/lib/analytics';

function MetricIcon({
  name,
  className,
}: {
  name: Project['metric']['icon'];
  className?: string;
}) {
  switch (name) {
    case 'star':
      return <Star className={className} />;
    case 'package':
      return <Package className={className} />;
    case 'puzzle':
      return <Puzzle className={className} />;
    case 'shield':
      return <Shield className={className} />;
  }
}

export default function HomeProjectCard({
  project,
  location = 'home',
}: {
  project: Project;
  location?: ProjectLocation;
}) {
  const cardId = project.id;

  return (
    <Card className="flex h-full flex-col border border-border bg-card hover:border-foreground/20">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-semibold text-foreground leading-snug">
            {project.title}
          </CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0 whitespace-nowrap text-xs"
          >
            <MetricIcon name={project.metric.icon} className="mr-1 h-3 w-3" />
            {project.metric.label}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      {(project.githubUrl || project.demoUrl) && (
        <CardFooter className="mt-auto gap-2 pt-0">
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              data-cursor={true}
              onClick={() => {
                trackProjectClick(project.id, 'github', location);
                window.open(project.githubUrl, '_blank');
              }}
            >
              <span data-cursor={`view-project-button-${cardId}`}>
                View Project
              </span>
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          )}
          {project.demoUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              data-cursor={true}
              onClick={() => {
                trackProjectClick(project.id, 'demo', location);
                window.open(project.demoUrl, '_blank');
              }}
            >
              <span data-cursor={`demo-project-button-${cardId}`}>Demo</span>
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
