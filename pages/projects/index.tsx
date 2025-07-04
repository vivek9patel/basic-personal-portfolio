import type { NextPage } from 'next';
import ProjectCard from '../../components/ProjectCard';
import { ProjectCardProps } from '../../components/ProjectCard';
import { useContext, useEffect, useState } from 'react';
import { ProjectListContext } from '../../context';
import { fetchProjectsStar } from '../../helpers/helpers';
import ReactGA from 'react-ga4';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type Props = {
  projectsList: Array<ProjectCardProps>;
};

type TypeFilterBy = 'stars' | 'year';

const Projects: NextPage<Props> = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [customOrderedProjectList, setCustomOrderedProjectList] = useState<
    ProjectCardProps[]
  >([]);
  const [filterBy, setFilterBy] = useState<TypeFilterBy>('stars');
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: 'pageview', page: '/projects', title: 'Projects' });

    fetchProjectsStar().then(updatedProjectsListWithStars => {
      setProjectList([...updatedProjectsListWithStars]);
    });
  }, []);

  useEffect(() => {
    const descendingSortFunction = (a: ProjectCardProps, b: ProjectCardProps) =>
      b[filterBy] - a[filterBy];
    setCustomOrderedProjectList([...projectList.sort(descendingSortFunction)]);
  }, [projectList, filterBy]);

  const extractBadgesSet = () => {
    const s = new Set();
    projectList.forEach(project => {
      project.badges.forEach(badge => {
        s.add(badge.toLowerCase());
      });
    });
    return Array.from(s);
  };

  const filterByBadge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredProjects = projectList.filter(project => {
      return project.badges.some(badge => badge.toLowerCase().includes(value));
    });
    setCustomOrderedProjectList([...filteredProjects]);
  };

  return (
    <div className="my-4 sm:my-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of projects showcasing my journey in software
          development, from web applications to browser extensions and data
          visualizations.
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex sm:flex-row w-full sm:w-auto flex-col items-start sm:items-end gap-4 text-sm 2xl:text-base">
          <div className="flex-1">
            <Label
              htmlFor="sort-select"
              className="text-sm font-medium mb-2 block"
            >
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
              <SelectTrigger id="sort-select" className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="stars">Stars</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="priority">Vivek's Favorites</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:ml-4 ml-0 mt-4 sm:mt-0 w-full sm:w-auto sm:flex-1">
            <Label
              htmlFor="search-project"
              className="text-sm font-medium mb-2 block"
            >
              Filter by technology
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="search-project"
                data-cursor-focusable="true"
                name="search-project"
                placeholder="React, Python, D3, Next.js..."
                onChange={filterByBadge}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
        {customOrderedProjectList.map((project: ProjectCardProps, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
