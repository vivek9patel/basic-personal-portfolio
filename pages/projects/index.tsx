import type { NextPage } from "next";
import ProjectCard from "../../components/ProjectCard";
import { ProjectCardProps } from "../../components/ProjectCard";
import { useContext, useEffect, useState } from "react";
import { ProjectListContext } from "../../context";
import { fetchProjectsStar } from "../../helpers/helpers";
import ReactGA from "react-ga4";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Props = {
  projectsList: Array<ProjectCardProps>;
};

type TypeFilterBy = "stars" | "year";

const Projects: NextPage<Props> = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [customOrderedProjectList, setCustomOrderedProjectList] = useState<
    ProjectCardProps[]
  >([]);
  const [filterBy, setFilterBy] = useState<TypeFilterBy>("stars");
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/projects", title: "Projects" });

    fetchProjectsStar().then((updatedProjectsListWithStars) => {
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
    projectList.forEach((project) => {
      project.badges.forEach((badge) => {
        s.add(badge.toLowerCase());
      });
    });
    return Array.from(s);
  };

  const filterByBadge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredProjects = projectList.filter((project) => {
      return project.badges.some((badge) =>
        badge.toLowerCase().includes(value)
      );
    });
    setCustomOrderedProjectList([...filteredProjects]);
  };

  return (
    <div className="my-4 sm:my-10">
      <div className="flex sm:flex-row w-full sm:w-auto flex-col items-center text-sm 2xl:text-base">
        <div className="flex-1">
          <Select
            onValueChange={(value) => {
              ReactGA.event({
                category: "Button.Click",
                action: "Sort Projects",
                label: value,
              });
              setFilterBy(value as TypeFilterBy);
            }}
            value={filterBy}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:ml-4 ml-0 mt-4 sm:mt-0 w-full sm:w-auto sm:flex-1 flex items-center">
        <Label htmlFor="search-project">Filter by</Label>
          <Input
            type="text"
            data-cursor-focusable="true"
            name="search-project"
            placeholder="React, Python, D3"
            onChange={filterByBadge}
          />
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
