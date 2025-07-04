import type { NextPage } from 'next';
import { Anchor } from '../components/CustomHtml';
import { Button } from '@/components/ui/button';
import ProjectCard from '../components/ProjectCard';
import { ProjectCardProps } from '../components/ProjectCard';
import { useContext, useEffect, useState } from 'react';
import { ProjectListContext } from '../context';
import { fetchProjectsStar } from '../helpers/helpers';
import { useRouter } from 'next/router';

import hubspotLogo from '../images/hubspot.svg';
import uopxLogo from '../images/uopx-phoenixbird-red.png';
import hackerrankLogo from '../images/HackerRank_logo.png';
import hmsLogo from '../images/100ms_logo.png';
import webmateLogo from '../images/webmate_logo.png';
import EmailBox from '../components/EmailBox';
import ReactGA from 'react-ga4';
import { Separator } from '@/components/ui/separator';
import GitHubStats from '../components/GitHubStats';

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
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });
    fetchProjectsStar().then(updatedProjectsListWithStars => {
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
              <span className="text-primary">Frontend Magician 🪄</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <GitHubStats username="vivek9patel" />
          </div>
          {/* <div className="text-lg md:text-xl text-muted-foreground font-light mt-4 ">
            Bringing your vision to life, one pixel at a time. 🎨
          </div> */}
          <div className=" text-muted-foreground font-light space-y-1 mt-8">
            <p className="">
              I'm a developer based in{' '}
              <Anchor
                href="https://www.google.com/maps/place/durham+nc/data=!4m2!3m1!1s0x89ace471120f66f1:0xe17ada898a46f27e?sa=X&ved=1t:155783&ictx=111"
                target={'_blank'}
                onClick={() => {
                  ReactGA.event({
                    category: 'Link.Click',
                    action: 'Durham Location',
                  });
                }}
              >
                Durham, NC
              </Anchor>
              , with 2 years of experience working with various software
              applications, and teams from US and India. I specialize in
              building{' '}
              <Anchor
                href="https://vivek9patel.github.io/"
                onClick={() => {
                  ReactGA.event({
                    category: 'Link.Click',
                    action: 'Exceptional Link',
                  });
                }}
                target={'_blank'}
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
            variant="outline"
            onClick={() => {
              clientRouter.push('/resume');
            }}
          >
            View Resume
          </Button>
        </div>
        <div className="text-muted-foreground font-light mt-2 mb-4 ">
          For over 2 years, I have cultivated a deep understanding and expertise
          in <span className="">Front-end Engineering</span>, always
          prioritizing the user's needs. In every project I undertake, my aim is
          to craft tailored, intuitive, and thoroughly tested experiences that
          align the goals of companies with the expectations of users.
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className=" text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Mar '25 - Present
          </div>
          <div className="flex justify-center">
            <img
              src={hubspotLogo.src}
              alt="HubSpot Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-muted-foreground font-light">
                Full Time - Present
              </div>
              <div className="text-lg sm:text-xl">
                Engineering at{' '}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: 'Link.Click',
                      action: 'HubSpot Link',
                    });
                  }}
                  href="https://www.google.com/search?q=husbpot"
                >
                  HubSpot
                </Anchor>
              </div>
              <div className="text-light text-muted-foreground mt-2">
                {/* I develop robust, responsive components with a focus on
                accessibility, enhancing user experiences alongside Adobe AEM,
                Adobe ADA, and Adobe Target. <br></br>
                Worked on building new microservice with Spring Boot, Java, Elasticsearch, Docker, Terraform and AWS. */}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className=" text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Jun '24 - Feb'25
          </div>
          <div className="flex justify-center">
            <img
              src={uopxLogo.src}
              alt="University of Phoenix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-muted-foreground font-light">
                Full Time - 9 months
              </div>
              <div className="text-lg sm:text-xl">
                Engineer II at{' '}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: 'Link.Click',
                      action: 'UOPX Link',
                    });
                  }}
                  href="https://www.google.com/search?q=university+of+phoenix"
                >
                  University of Phoenix
                </Anchor>
              </div>
              <div className="text-light text-muted-foreground mt-2">
                {/* I develop robust, responsive components with a focus on
                accessibility, enhancing user experiences alongside Adobe AEM,
                Adobe ADA, and Adobe Target. <br></br>
                Worked on building new microservice with Spring Boot, Java, Elasticsearch, Docker, Terraform and AWS. */}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between flex-col lg:flex-row">
          <div className=" text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            May '23 - Apr '24
          </div>
          <div className="flex justify-center">
            <img
              src={uopxLogo.src}
              alt="University of Phoenix Logo"
              className="h-12 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-muted-foreground font-light">
                Internship - 1 year
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at{' '}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: 'Link.Click',
                      action: 'UOPX Link',
                    });
                  }}
                  href="https://www.google.com/search?q=university+of+phoenix"
                >
                  University of Phoenix
                </Anchor>
              </div>
              <div className="text-light text-muted-foreground mt-2">
                I develop robust, responsive components with a focus on
                accessibility, enhancing user experiences alongside Adobe AEM,
                Adobe ADA, and Adobe Target. <br></br>
                Worked on building new microservice with Spring Boot, Java,
                Elasticsearch, Docker, Terraform and AWS.
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between  flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl  mb-6 lg:mb-0  flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Jan '22 - Jun '22
          </div>
          <div className="flex justify-center">
            <img
              src={hackerrankLogo.src}
              alt="Hackerrank Logo"
              className="h-14 mr-2 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-muted-foreground font-light">
                Internship - 6 months
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at{' '}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: 'Link.Click',
                      action: 'Hackerrank Link',
                    });
                  }}
                  href="https://www.google.com/search?q=hackerrank"
                >
                  HackerRank
                </Anchor>
              </div>
              <div className="text-light text-muted-foreground mt-2">
                I contributed to the optimization of a cloud-based Integrated
                Development Environment (IDE), elevating efficiency. I worked on
                theia, React.js, Typescript, Docker, and Kubernetes.
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between  flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl  mb-6 lg:mb-0   flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Apr '21 - Jun '21
          </div>
          <div className="flex justify-center">
            <img
              src={hmsLogo.src}
              alt="100ms Logo"
              className="h-10 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-muted-foreground font-light">
                Internship - 3 months
              </div>
              <div className="text-lg sm:text-xl">
                Software Engineer at{' '}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: 'Link.Click',
                      action: '100ms Link',
                    });
                  }}
                  href="https://www.google.com/search?q=100ms"
                >
                  100ms
                </Anchor>
              </div>
              <div className="text-light text-muted-foreground mt-2">
                I worked with fontend Dashboard team, building a customised
                video-conferencing app-builder using Next.js, Typescript,
                Tailwind CSS, Vercel and AWS.
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between  flex-col lg:flex-row">
          <div className="text-4xl xl:text-5xl  mb-6 lg:mb-0   flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
            Jun '20 - Mar '21
          </div>
          <div className="flex justify-center">
            <img
              src={webmateLogo.src}
              alt="Webmate's Logo"
              className="h-10 mr-4 mt-1 hidden sm:block"
            ></img>
            <div className="flex flex-col justify-between sm:w-[500px]">
              <div className=" text-muted-foreground font-light">
                Part-time - 9 months
              </div>
              <div className="text-lg sm:text-xl">
                Co-founder at{' '}
                <Anchor
                  onClick={() => {
                    ReactGA.event({
                      category: 'Link.Click',
                      action: 'Webmate Link',
                    });
                  }}
                  href="https://thewebmate.in/"
                >
                  Webmate Web Services
                </Anchor>
              </div>
              <div className="text-light text-muted-foreground mt-2">
                Led the establishment of an affordable software services
                platform for small businesses during the pandemic, driving
                client meeting management and exceptional customer satisfaction.
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div
          onClick={() => {
            ReactGA.event({
              category: 'Link.Click',
              action: 'Recommendations Link',
            });
            window.open('https://www.linkedin.com/in/vivek9patel/', '_blank');
          }}
          className=" text-muted-foreground underline hover:text-ring"
        >
          See my recommendations on LinkedIn
          {' ->'}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-10 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Projects</div>
          <Button
            variant="outline"
            onClick={() => {
              clientRouter.push('/projects');
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
        <div className="font-light text-muted-foreground mt-4 mb-10">
          I'm always open to new opportunities and connections. Feel free to
          reach out to me at{' '}
          <Anchor
            onClick={() => {
              ReactGA.event({
                category: 'Link.Click',
                action: 'MailTo Link',
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
