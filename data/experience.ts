import { ExperienceEntry } from '@/interfaces/experience.interface';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'hubspot',
    company: 'HubSpot',
    role: 'Software Engineer',
    highlights: [
      'Architected frontend plugin infrastructure for HubSpot’s AI content editor, enabling internal teams to independently build and deploy diverse content-type editors.',
      'Designed scalable framework contracts and APIs that decoupled the core editor layout from product-specific plugin features.',
      'Standardized development workflows across engineering teams by creating robust SDKs, shared UI contracts, and integration tooling.',
    ],
    priority: 1,
  },
  {
    id: 'univ-phoenix-ii',
    company: 'University of Phoenix',
    role: 'Engineer II',
    highlights: [
      'Scaled core user platforms alongside Adobe AEM and Adobe Target.',
      'Designed and deployed Java / Spring Boot microservices backed by AWS, Docker, and Terraform.',
    ],
    stack: ['Java', 'Spring Boot', 'AWS', 'Docker', 'Terraform'],
    priority: 2,
  },
  {
    id: 'hackerrank',
    company: 'HackerRank',
    role: 'Software Engineer, Core Systems',
    highlights: [
      'Optimized a cloud-based Integrated Development Environment (Theia), improving efficiency at scale.',
      'Worked across React, TypeScript, Docker, and Kubernetes-based orchestration.',
    ],
    stack: ['React', 'TypeScript', 'Kubernetes', 'Docker'],
    priority: 3,
  },
  {
    id: '100ms',
    company: '100ms',
    role: 'Software Engineer',
    highlights: [
      'Contributed to the dashboard team building a customizable video-conferencing app builder.',
      'Shipped features with Next.js, TypeScript, Tailwind CSS, Vercel, and AWS.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS'],
    priority: 4,
  },
  {
    id: 'webmate',
    company: 'Webmate Web Services',
    role: 'Co-founder',
    highlights: [
      'Co-founded an affordable software services platform for small businesses during the pandemic.',
      'Led client engagement and delivery, driving strong customer satisfaction.',
    ],
    priority: 5,
  },
];
