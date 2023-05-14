import type { NextPage } from "next";
import { Anchor } from "../components/CustomHtml";
import ProjectCard from "../components/ProjectCard";
import { ProjectCardProps } from "../components/ProjectCard";
import { useContext, useEffect } from "react";
import { ProjectListContext } from "../context";
import projectsData from "../data/projects.json";

type Props = {
  projectsSortedByStars: Array<ProjectCardProps>;
};

const Home: NextPage<Props> = ({ projectsSortedByStars }) => {
  const { setProjectList } = useContext(ProjectListContext);

  useEffect(() => {
    setProjectList(projectsSortedByStars);
  }, [projectsSortedByStars]);

  return (
    <div className="margin-wrapper my-10">
      <div className="mt-20 flex">
        <div className="">
          <div className="text-5xl font-medium">
            <div className="">Hey, I'm Vivek Patel</div>
            <div className=" mt-4">
              I'm a <span className=" text-v9-yellow">Frontend Developer</span>.
            </div>
          </div>
          <div className="text-2xl text-v9-light-grey font-light mt-4 ">
            Bringing your vision to life, one pixel at a time. 🎨
          </div>
          <div className=" text-lg text-v9-light-grey space-y-1 mt-8">
            <p className="">
              I'm a developer based in Phoenix with 2 years of experience
              working in various technologies. I specialize in building{" "}
              <Anchor href="https://vivek9patel.github.io/" target={"_blank"}>
                exceptional websites
              </Anchor>
              , applications, and everything in between. Currently I am in my
              final year of completing Master's degree in Computer Science from
              ASU.
            </p>
          </div>
        </div>
        {/* <div>
          <img src="/images/vivek9patel.png" className="w-80" />
        </div> */}
      </div>
      {/* <Hr /> */}
      <div className="mt-20">
        <div className="flex justify-between mb-10 items-center">
          <div className="text-5xl font-medium">Projects</div>
          <button className="text-lg font-light bg-v9-secondary-black hover:border-v9-pink px-3 py-1 border-2 rounded-md border-opacity-5 hover:border-opacity-30 transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
          {projectsSortedByStars &&
            projectsSortedByStars.map((project: ProjectCardProps, i) => (
              <ProjectCard key={i} {...project} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const projectsList: ProjectCardProps[] = projectsData;
  // fetch stars for each project and sort by stars
  for (let i = 0; i < projectsList.length; i++) {
    const project = projectsList[i];
    const starsUrl =
      "https://api.github.com/repos/" +
      project.github_url.split("/").slice(-2).join("/");

    const starsRes = await fetch(starsUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      },
    });
    const projectDetail = await starsRes.json();
    if (projectDetail && projectDetail.hasOwnProperty("stargazers_count")) {
      project.stars = projectDetail.stargazers_count;
    } else project.stars = 0;
  }
  projectsList.sort((a, b) => b.stars - a.stars);

  return {
    props: {
      projectsSortedByStars: projectsList,
    },
  };
}
