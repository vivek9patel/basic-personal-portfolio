import { ProjectCardProps } from '@/components/ProjectCard';
import { Project } from '@/interfaces/project.interface';

export function projectCardToGridProject(project: ProjectCardProps): Project {
  const id = project.title.replace(/\s+/g, '-').toLowerCase();

  let metric: Project['metric'];
  if (project.stars > 5) {
    metric = {
      icon: 'star',
      label: `${project.stars.toLocaleString()} Stars`,
    };
  } else if (
    project.title.toLowerCase().includes('vscode') ||
    project.category === 'VS Code Extension'
  ) {
    metric = { icon: 'package', label: '4,000+ Installs' };
  } else if (
    project.badges.some(b => b.toLowerCase().includes('chrome extension')) ||
    project.category.toLowerCase().includes('chrome')
  ) {
    metric = { icon: 'puzzle', label: 'Chrome Extension' };
  } else {
    metric = { icon: 'shield', label: project.category || 'Project' };
  }

  return {
    id,
    title: project.title,
    description: project.tagline,
    metric,
    githubUrl: project.github_url || undefined,
    demoUrl: project.demo_url || undefined,
    priority: project.priority,
  };
}
