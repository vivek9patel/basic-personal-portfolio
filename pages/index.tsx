import type { NextPage } from "next";
import { Anchor, Button } from "../components/CustomHtml";
import ProjectCard from "../components/ProjectCard";
import { ProjectCardProps } from "../components/ProjectCard";
import { useContext, useEffect, useState } from "react";
import { ProjectListContext } from "../context";
import { fetchProjectsStar } from "../helpers/helpers";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [top6Projects, setTop6Projects] = useState<ProjectCardProps[]>([]);
  const clientRouter = useRouter();

  useEffect(() => {
    setTop6Projects(
      projectList.sort((a, b) => b.priority - a.priority).slice(0, 6)
    );
  }, [projectList]);

  useEffect(() => {
    (async () => {
      const updatedProjectsListWithStars = await fetchProjectsStar();
      setProjectList([...updatedProjectsListWithStars]);
    })();
  }, []);

  return (
    <div className="margin-wrapper my-20">
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
          <Button
            onClick={() => {
              clientRouter.push("/projects");
            }}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
          {top6Projects.map((project: ProjectCardProps, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
