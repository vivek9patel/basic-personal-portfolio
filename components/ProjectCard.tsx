import { useEffect, useState } from 'react';
import { badgeImage } from '../helpers/helpers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import ReactGA from 'react-ga4';
import { Badge } from './ui/badge';

export type ProjectCardProps = {
  title: string;
  tagline: string;
  badges: string[];
  year: number;
  github_url: string;
  demo_url: string;
  stars: number;
  priority: number;
  category: string;
};

export default function ProjectCard(props: ProjectCardProps) {
  const [cardId, setCardId] = useState<string>('');
  useEffect(() => {
    setCardId(props.title.replace(/\s/g, '-').toLowerCase());
  }, [props.title]);

  return (
    <Card className="flex flex-col justify-between transition-colors rounded-lg shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-primary">{props.year}</div>
          {props.stars ? (
            <Badge variant="secondary" className="shadow">
              <span className="mr-2 text-sm">{props.stars}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width={'14px'}
                height={'14px'}
                fill={'currentcolor'}
              >
                <path
                  fillRule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                ></path>
              </svg>
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-lg sm:text-xl font-medium">
          {props.title}
        </CardTitle>
        <CardDescription className="font-light">
          {props.tagline}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex custom-scroll-bar-y justify-start items-center">
          {props.badges.map((badge, i) => (
            <img
              key={i}
              className="m-1 opacity-80"
              src={`${badgeImage[badge.toLowerCase()]}`}
              alt={`${badge} badge image`}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center">
        {props.github_url && (
          <Button
            variant="outline"
            onClick={() => {
              ReactGA.event({
                category: 'Button.Click',
                action: 'Project Github URL',
                label: props.github_url,
              });
              window.open(props.github_url, '_blank');
            }}
            className="mx-1 flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            id={`view-project-button-${cardId}`}
          >
            <span
              data-cursor={`view-project-button-${cardId}`}
              className="mr-2"
            >
              View Project
            </span>
            <svg
              data-cursor={`view-project-button-${cardId}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={'14px'}
              height={'14px'}
              fill={'currentcolor'}
            >
              <g data-name="Layer 2">
                <g data-name="external-link">
                  <rect width="24" height="24" opacity="0"></rect>
                  <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"></path>
                  <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"></path>
                </g>
              </g>
            </svg>
          </Button>
        )}
        {props.demo_url && (
          <Button
            variant="outline"
            onClick={() => {
              ReactGA.event({
                category: 'Button.Click',
                action: 'Project Demo URL',
                label: props.demo_url,
              });
              window.open(props.demo_url, '_blank');
            }}
            className="mx-1 flex-1"
            id={`demo-project-button-${cardId}`}
          >
            <span
              data-cursor={`demo-project-button-${cardId}`}
              className="mr-2"
            >
              Demo
            </span>
            <svg
              data-cursor={`demo-project-button-${cardId}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={'14px'}
              height={'14px'}
              fill={'currentcolor'}
            >
              <g data-name="Layer 2">
                <g data-name="external-link">
                  <rect width="24" height="24" opacity="0"></rect>
                  <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z"></path>
                  <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z"></path>
                </g>
              </g>
            </svg>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
