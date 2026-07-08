import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import HomeProjectCard from '@/components/HomeProjectCard';

export default function ProjectsSection() {
  const featured = [...PROJECTS]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Open-Source &amp; Side Projects
        </h2>
        <Link href="/projects" passHref>
          <a
            className="text-sm font-medium text-primary hover:underline shrink-0"
            data-cursor={true}
          >
            View all
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map(project => (
          <HomeProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
