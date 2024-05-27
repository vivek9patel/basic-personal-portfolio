import type { NextPage } from "next";
import { Anchor, Button, Hr } from "../components/CustomHtml";
import ProjectCard from "../components/ProjectCard";
import { ProjectCardProps } from "../components/ProjectCard";
import { useContext, useEffect, useState } from "react";
import { ProjectListContext } from "../context";
import { fetchProjectsStar } from "../helpers/helpers";
import { useRouter } from "next/router";

import uopxLogo from "../images/uopx-phoenixbird-red.png";
import hackerrankLogo from "../images/HackerRank_logo.png";
import hmsLogo from "../images/100ms_logo.png";
import webmateLogo from "../images/webmate_logo.png";
import EmailBox from "../components/EmailBox";
import ReactGA from "react-ga4";

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

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
    // google analytics
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
    fetchProjectsStar().then((updatedProjectsListWithStars) => {
      setProjectList([...updatedProjectsListWithStars]);
    });
  }, []);

  return (
    <div className="relative my-10 sm:my-20">
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div className="">Hey, I'm Vivek Patel</div>
            <div className=" mt-4">
              <span className="hidden sm:inline-block mr-4">I'm a </span>
              <span className=" text-v9-yellow whitespace-nowrap">
                Software Engineer
              </span>
              .
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <a className="no-underline" href="https://github.com/vivek9patel" target="_blank">
              <img alt="GitHub followers" src="https://img.shields.io/github/followers/vivek9patel" />
            </a>
            <a className="no-underline ml-4" href="https://github.com/vivek9patel?tab=repositories&q=&type=&language=&sort=stargazers" target="_blank">
              <img alt="GitHub User's stars" src="https://img.shields.io/github/stars/vivek9patel" />
            </a>
          </div>
          {/* <div className="text-lg md:text-xl text-v9-light-grey font-light mt-4 ">
            Bringing your vision to life, one pixel at a time. 🎨
          </div> */}
          <div className=" text-v9-light-grey font-light space-y-1 mt-8">
            <p className="">
              I'm a developer based in{" "}
              <Anchor
                href="https://www.google.com/maps/place/Phoenix,+AZ,+USA/@33.6055497,-112.4547016,10z"
                target={"_blank"}
                onClick={() => {
                  ReactGA.event({
                    category: "Link.Click",
                    action: "Tempe Location",
                  });
                }}
              >
                Phoenix, AZ
              </Anchor>
              , with 2 years of experience working with various software applications, and teams from US and India. I
              specialize in building{" "}
              <Anchor
                href="https://vivek9patel.github.io/"
                onClick={() => {
                  ReactGA.event({
                    category: "Link.Click",
                    action: "Exceptional Link",
                  });
                }}
                target={"_blank"}
              >
                exceptional softwares
              </Anchor>
              , applications, backend services and everything in between.
            </p>
          </div>
        </div>
        {/* <div>
          <img src="/images/vivek9patel.png" className="w-80" />
        </div> */}
      </div>

      {/* Experience Section */}
      <div className=" mt-20 sm:mt-32">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Experience</div>
          <Button
            onClick={() => {
              clientRouter.push("/resume");
            }}
          >
            View Resume
          </Button>
        </div>
        <div className="text-v9-light-grey font-light mt-2 mb-4 ">
          For over 3 years, I have cultivated a deep understanding and expertise
          in <span className="">Front-end Engineering</span>, always
          prioritizing the user's needs. In every project I undertake, my aim is
          to craft tailored, intuitive, and thoroughly tested experiences that
          align the goals of companies with the expectations of users.
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className=" text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Jun '24 - Present
          </div>
          <div className="flex justify-center">
            <img
              src={uopxLogo.src}
              alt="University of Phoenix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-v9-light-grey font-light">
                Full Time - Present
              </div>
              <div className="text-lg sm:text-xl">
                Engineer II at{" "}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: "Link.Click",
                      action: "UOPX Link",
                    });
                  }}
                  href="https://www.google.com/search?q=university+of+phoenix"
                >
                  University of Phoenix
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                {/* I develop robust, responsive components with a focus on
                accessibility, enhancing user experiences alongside Adobe AEM,
                Adobe ADA, and Adobe Target. <br></br>
                Worked on building new microservice with Spring Boot, Java, Elasticsearch, Docker, Terraform and AWS. */}
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className=" text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            May '23 - Apr '24
          </div>
          <div className="flex justify-center">
            <img
              src={uopxLogo.src}
              alt="University of Phoenix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-v9-light-grey font-light">
                Internship - 1 year
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at{" "}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: "Link.Click",
                      action: "UOPX Link",
                    });
                  }}
                  href="https://www.google.com/search?q=university+of+phoenix"
                >
                  University of Phoenix
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                I develop robust, responsive components with a focus on
                accessibility, enhancing user experiences alongside Adobe AEM,
                Adobe ADA, and Adobe Target. <br></br>
                Worked on building new microservice with Spring Boot, Java, Elasticsearch, Docker, Terraform and AWS.
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between  flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl  mb-6 lg:mb-0  flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Jan '22 - Jun '22
          </div>
          <div className="flex justify-center">
            <img
              src={hackerrankLogo.src}
              alt="Hackerrank Logo"
              className="h-14 mr-2 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-v9-light-grey font-light">
                Internship - 6 months
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at{" "}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: "Link.Click",
                      action: "Hackerrank Link",
                    });
                  }}
                  href="https://www.google.com/search?q=hackerrank"
                >
                  HackerRank
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                I contributed to the optimization of a cloud-based Integrated
                Development Environment (IDE), elevating efficiency. I worked on
                theia, React.js, Typescript, Docker, and Kubernetes.
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between  flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl  mb-6 lg:mb-0   flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Apr '21 - Jun '21
          </div>
          <div className="flex justify-center">
            <img
              src={hmsLogo.src}
              alt="100ms Logo"
              className="h-10 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-v9-light-grey font-light">
                Internship - 3 months
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at{" "}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: "Link.Click",
                      action: "100ms Link",
                    });
                  }}
                  href="https://www.google.com/search?q=100ms"
                >
                  100ms
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                I worked with fontend Dashboard team, building a customised
                video-conferencing app-builder using Next.js, Typescript,
                Tailwind CSS, Vercel and AWS.
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div className="flex justify-between  flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl  mb-6 lg:mb-0   flex items-center justify-center Arialic_Hollow text-v9-light-grey font-light">
            Jun '20 - Mar '21
          </div>
          <div className="flex justify-center">
            <img
              src={webmateLogo.src}
              alt="Webmate's Logo"
              className="h-10 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-v9-light-grey font-light">
                Part-time - 9 months
              </div>
              <div className="text-lg sm:text-xl">
                Co-founder at{" "}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: "Link.Click",
                      action: "Webmate Link",
                    });
                  }}
                  href="https://thewebmate.in/"
                >
                  Webmate Web Services
                </Anchor>
              </div>
              <div className="text-light text-v9-light-grey mt-2">
                Led the establishment of an affordable software services
                platform for small businesses during the pandemic, driving
                client meeting management and exceptional customer satisfaction.
              </div>
            </div>
          </div>
        </div>
        <Hr width="100%" />
        <div
          onClick={() => {
            ReactGA.event({
              category: "Link.Click",
              action: "Recommendations Link",
            });
            window.open("https://www.linkedin.com/in/vivek9patel/", "_blank");
          }}
          className=" text-v9-light-grey underline hover:text-white"
        >
          See my recommendations on LinkedIn
          {" ->"}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Projects</div>
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

      {/* Contact email section */}
      <div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <div className="font-light text-v9-light-grey mt-4 mb-10">
          I'm always open to new opportunities and connections. Feel free to
          reach out to me at{" "}
          <Anchor
            onClick={() => {
              ReactGA.event({
                category: "Link.Click",
                action: "MailTo Link",
              });
            }}
            href="mailto:vivek.p9737@gmail.com"
          >
            vivek.p9737@gmail.com
          </Anchor>
          !
        </div>
        <EmailBox />
      </div>
    </div>
  );
};

export default Home;
