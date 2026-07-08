import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import ThemeControls from '@/components/theme-controls';
import HomeProjectCard from '@/components/HomeProjectCard';
import { ProjectListContext } from '@/context';
import { fetchProjectsStar } from '@/helpers/helpers';
import { projectCardToGridProject } from '@/helpers/project-mapper';
import { ProjectCardProps } from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TypeFilterBy = 'stars' | 'year' | 'priority';

const Projects: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [customOrderedProjectList, setCustomOrderedProjectList] = useState<
    ProjectCardProps[]
  >([]);
  const [filterBy, setFilterBy] = useState<TypeFilterBy>('priority');

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/projects', title: 'Projects' });

    fetchProjectsStar().then(updatedProjectsListWithStars => {
      setProjectList([...updatedProjectsListWithStars]);
    });
  }, [setProjectList]);

  useEffect(() => {
    const descendingSortFunction = (a: ProjectCardProps, b: ProjectCardProps) =>
      b[filterBy] - a[filterBy];
    setCustomOrderedProjectList([...projectList].sort(descendingSortFunction));
  }, [projectList, filterBy]);

  const filterByBadge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      const descendingSortFunction = (
        a: ProjectCardProps,
        b: ProjectCardProps
      ) => b[filterBy] - a[filterBy];
      setCustomOrderedProjectList(
        [...projectList].sort(descendingSortFunction)
      );
      return;
    }

    const filteredProjects = projectList.filter(project =>
      project.badges.some(badge => badge.toLowerCase().includes(value))
    );
    setCustomOrderedProjectList([...filteredProjects]);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed right-6 top-6 z-50">
        <ThemeControls />
      </div>
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24 space-y-8">
        <section className="space-y-3">
          <Link href="/" passHref>
            <a
              className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
              data-cursor={true}
            >
              ← Home
            </a>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Open-Source &amp; Side Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Everything I&apos;ve shipped — web apps, extensions, and tools.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-2">
            <Label htmlFor="sort-select" className="text-sm font-medium">
              Sort by
            </Label>
            <Select
              onValueChange={value => {
                ReactGA.event({
                  category: 'Button.Click',
                  action: 'Sort Projects',
                  label: value,
                });
                setFilterBy(value as TypeFilterBy);
              }}
              value={filterBy}
            >
              <SelectTrigger id="sort-select" className="w-full sm:w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="priority">Favorites</SelectItem>
                  <SelectItem value="stars">Stars</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="search-project" className="text-sm font-medium">
              Filter by technology
            </Label>
            <Input
              type="text"
              id="search-project"
              data-cursor-focusable="true"
              placeholder="React, Python, D3, Next.js..."
              onChange={filterByBadge}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customOrderedProjectList.map((project, i) => (
            <HomeProjectCard
              key={`${project.title}-${i}`}
              project={projectCardToGridProject(project)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
