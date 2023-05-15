import type { NextPage } from "next";
import ProjectCard from "../../components/ProjectCard";
import { ProjectCardProps } from "../../components/ProjectCard";
import { useContext, useEffect, useState } from "react";
import { ProjectListContext } from "../../context";
import { fetchProjectsStar } from "../../helpers/helpers";
import { Button, Hr } from "../../components/CustomHtml";

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
    (async () => {
      const updatedProjectsListWithStars = await fetchProjectsStar();
      setProjectList([...updatedProjectsListWithStars]);
    })();
  }, []);

  useEffect(() => {
    console.log(extractBadgesSet());
    const descendingSortFunction = (a: ProjectCardProps, b: ProjectCardProps) =>
      b[filterBy] - a[filterBy];
    console.log(filterBy);
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
    <div className="margin-wrapper my-10">
      <div className="flex items-center text-sm 2xl:text-base">
        <div>
          <span>Filter by: </span>
          <select
            className=" bg-v9-secondary-black py-1 px-2 ml-2 rounded border-2 border-opacity-5 outline-none text-v9-light-grey focus:border-v9-pink"
            value={filterBy}
            onChange={(e) => {
              console.log(e.target.value);
              setFilterBy(e.target.value as TypeFilterBy);
            }}
          >
            <option value={"stars"}>stars</option>
            <option value={"year"}>year</option>
          </select>
        </div>
        <div className="ml-4 flex-1 flex items-center">
          <span>Search by: </span>
          <input
            className=" bg-white text-black py-1 px-2 mx-2 rounded flex-1 border-2 border-v9-light-grey focus:border-v9-pink active:border-v9-pink outline-none"
            type="text"
            name="search-project"
            placeholder="Javascript, Python, etc."
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
