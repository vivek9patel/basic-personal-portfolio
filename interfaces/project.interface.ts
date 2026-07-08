export interface Project {
  id: string;
  title: string;
  description: string;
  metric: {
    icon: 'star' | 'package' | 'puzzle' | 'shield';
    label: string;
  };
  githubUrl?: string;
  demoUrl?: string;
  priority: number;
}
