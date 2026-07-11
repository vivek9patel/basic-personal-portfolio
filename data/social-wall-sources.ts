import { SocialWallSource } from '@/interfaces/social-wall.interface';

/** Curate posts here — text, dates, and engagement are fetched at build time. */
export const SOCIAL_WALL_SOURCES: SocialWallSource[] = [
  {
    id: 'linkedin-internship',
    type: 'linkedin',
    url: 'https://www.linkedin.com/posts/vivek9patel_internship-hackerrank-activity-6949415675777937408-YrcE',
    size: 'large',
  },
  {
    id: 'linkedin-ubuntu-portfolio',
    type: 'linkedin',
    url: 'https://www.linkedin.com/posts/vivek9patel_%F0%9D%98%90%F0%9D%98%AF%F0%9D%98%B5%F0%9D%98%A6%F0%9D%98%B3%F0%9D%98%AF%F0%9D%98%A6%F0%9D%98%B5-%F0%9D%98%AA%F0%9D%98%B4-%F0%9D%98%A2%F0%9D%98%AF%F0%9D%98%A2%F0%9D%98%AE%F0%9D%98%A2%F0%9D%98%BB%F0%9D%98%AA%F0%9D%98%AF%F0%9D%98%A8-activity-6789142761787547648-k_9G',
    size: 'large',
    postedAt: '2021-04-17',
  },
  {
    id: 'tweet-ubuntu-quote',
    type: 'tweet',
    url: 'https://x.com/ubuntu/status/1383033647805177857',
    size: 'wide',
  },
  {
    id: 'tweet-ai-layer',
    type: 'tweet',
    url: 'https://x.com/vivek9patel/status/1952928010438426665',
    size: 'square',
  },
  {
    id: 'tweet-shadcnai',
    type: 'tweet',
    url: 'https://x.com/vivek9patel/status/1949705856536162652',
    size: 'square',
  },
  {
    id: 'tweet-debugging',
    type: 'tweet',
    url: 'https://x.com/vivek9patel/status/2075961815205343658',
    size: 'square',
  },
  {
    id: 'photo-gm-vivek',
    type: 'image',
    src: '/images/social-wall/gm-vivek.jpg',
    alt: 'Polaroid photo labeled GM Vivek',
    caption: 'not really lol',
    size: 'square',
  },
  {
    id: 'photo-hubspot-lego',
    type: 'image',
    src: '/images/social-wall/hackerrank-ireland.jpg',
    alt: 'LEGO model of the HubSpot Dublin office',
    caption: 'HubSpot Dublin',
    size: 'tall',
  },
  {
    id: 'photo-bookmarks-wall',
    type: 'image',
    src: '/images/social-wall/what.jpg',
    alt: 'Interactive wall asking what marks you leave in books',
    caption: 'What marks do you leave in books?',
    size: 'wide',
  },
];
