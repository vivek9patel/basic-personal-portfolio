import { Project } from '@/interfaces/project.interface';

export const PROJECTS: Project[] = [
  {
    id: 'ubuntu-web-simulation',
    title: 'Ubuntu 20.04 Web Simulation',
    description:
      'An in-browser OS simulation built with Next.js and Tailwind CSS, inspiring several community spin-offs.',
    metric: { icon: 'star', label: '4,300+ Stars' },
    githubUrl: 'https://github.com/vivek9patel/vivek9patel.github.io',
    demoUrl: 'https://vivek9patel.github.io',
    priority: 1,
  },
  {
    id: 'vscode-css-compat',
    title: 'VS Code CSS Browser Compatibility',
    description:
      'A developer-productivity extension that analyzes CSS rules on hover to surface cross-browser gaps natively.',
    metric: { icon: 'package', label: '4,000+ Installs' },
    githubUrl: 'https://github.com/vivek9patel/vscode-css-compatibility',
    demoUrl:
      'https://marketplace.visualstudio.com/items?itemName=vivek9patel.vscode-css-compatibility',
    priority: 2,
  },
  {
    id: 'jellyfin-sync',
    title: 'Jellyfin Sync',
    description:
      'An OpenClaw skill that downloads media with yt-dlp into your library, checks folders before writing, and tracks download progress on demand.',
    metric: { icon: 'shield', label: 'OpenClaw Skill' },
    githubUrl: 'https://github.com/vivek9patel/jellyfin_sync',
    priority: 3,
  },
  {
    id: 'shadcnai',
    title: 'shadcnai',
    description:
      'A CLI tool for generating beautiful shadcn/ui themes from natural language descriptions.',
    metric: { icon: 'shield', label: 'CLI Tool' },
    githubUrl: 'https://github.com/vivek9patel/shadcnai',
    demoUrl: 'https://shadcnai.com/docs/',
    priority: 4,
  },
];
