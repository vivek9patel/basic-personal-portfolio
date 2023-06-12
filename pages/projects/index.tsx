import type { NextPage } from "next";
import ProjectCard from "../../components/ProjectCard";
import { ProjectCardProps } from "../../components/ProjectCard";
import { useContext, useEffect, useState } from "react";
import { ProjectListContext } from "../../context";
import { fetchProjectsStar } from "../../helpers/helpers";
import { Hr } from "../../components/CustomHtml";
import ReactGA from "react-ga4";

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

    (async () => {
      const updatedProjectsListWithStars = await fetchProjectsStar();
      setProjectList([...updatedProjectsListWithStars]);
    })();
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
          <span>Filter by: </span>
          <select
            className=" bg-v9-secondary-black py-1 px-2 ml-2 rounded border-2 border-opacity-5 outline-none text-v9-light-grey focus:border-v9-yellow"
            value={filterBy}
            onChange={(e) => {
              ReactGA.event({
                category: "Button.Click",
                action: "Filter Projects",
                label: e.target.value,
              });
              setFilterBy(e.target.value as TypeFilterBy);
            }}
          >
            <option value={"stars"}>stars</option>
            <option value={"year"}>year</option>
            <option value={"priority"}>vivek's favorite</option>
          </select>
        </div>
        <div className="sm:ml-4 ml-0 mt-4 sm:mt-0 w-full sm:w-auto sm:flex-1 flex items-center">
          <span>Search by: </span>
          <input
            className=" border border-v9-light-grey border-opacity-10 bg-v9-primary-black py-1 px-2 mx-2 rounded flex-1 focus:border-v9-yellow active:border-v9-yellow outline-none"
            type="text"
            data-cursor-focusable="true"
            name="search-project"
            placeholder="React, Python, D3, etc."
            onChange={filterByBadge}
          />
        </div>
      </div>

      <Hr />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
        {customOrderedProjectList.map((project: ProjectCardProps, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
