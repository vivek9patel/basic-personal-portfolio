import type { NextPage } from 'next';
import { Anchor } from '../components/CustomHtml';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState, memo } from 'react';
import { ProjectListContext } from '../context';
import { fetchProjectsStar } from '../helpers/helpers';
import { useRouter } from 'next/router';
import { Separator } from '@/components/ui/separator';
import ReactGA from 'react-ga4';
import dynamic from 'next/dynamic';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

// Memoized components for performance - defined first
const LoadingSpinner = memo(() => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

// Dynamic imports for performance (client-side only) - defined after LoadingSpinner
const ProjectCard = dynamic(() => import('../components/ProjectCard'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const EmailBox = dynamic(() => import('../components/EmailBox'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const GitHubStats = dynamic(() => import('../components/GitHubStats'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

// Static image imports (more efficient for images)
import uopxLogo from '../images/uopx-phoenixbird-red.png';
import hackerrankLogo from '../images/HackerRank_logo.png';
import hmsLogo from '../images/100ms_logo.png';
import webmateLogo from '../images/webmate_logo.png';

const ExperienceItem = memo(
  ({
    dateRange,
    logo,
    logoAlt,
    duration,
    title,
    company,
    description,
    onLinkClick,
  }: {
    dateRange: string;
    logo: any;
    logoAlt: string;
    duration: string;
    title: string;
    company: string;
    description?: string;
    onLinkClick: () => void;
  }) => (
    <>
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="text-4xl xl:text-5xl mb-6 lg:mb-0 flex items-center justify-center Arialic_Hollow text-muted-foreground font-light">
          {dateRange}
        </div>
        <div className="flex justify-center">
          <img
            src={logo?.src || logo}
            alt={logoAlt}
            className="h-12 mr-4 mt-1 hidden sm:block"
            loading="lazy"
          />
          <div className="flex flex-col justify-between sm:w-[500px]">
            <div className="text-muted-foreground font-light">{duration}</div>
            <div className="text-lg sm:text-xl">
              {title}{' '}
              <Anchor
                href={`https://www.google.com/search?q=${company
                  .toLowerCase()
                  .replace(/\s+/g, '+')}`}
                onClick={onLinkClick}
              >
                {company}
              </Anchor>
            </div>
            {description && (
              <div className="text-light text-muted-foreground mt-2">
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  )
);
ExperienceItem.displayName = 'ExperienceItem';

const Home: NextPage = () => {
  const { projectList, setProjectList } = useContext(ProjectListContext);
  const [top6Projects, setTop6Projects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const clientRouter = useRouter();

  useEffect(() => {
    setTop6Projects(
      projectList.sort((a, b) => b.priority - a.priority).slice(0, 6)
    );
  }, [projectList]);

  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });

    fetchProjectsStar()
      .then(updatedProjectsListWithStars => {
        setProjectList([...updatedProjectsListWithStars]);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [setProjectList]);

  const handleLinkClick = (action: string) => {
    ReactGA.event({
      category: 'Link.Click',
      action,
    });
  };

  return (
    <div className="relative my-10 sm:my-20">
      <div className="mt-10 sm:mt-20 flex">
        <div className="">
          <div className="text-4xl md:text-5xl font-medium">
            <div className="">Hey, I'm Vivek Patel</div>
            <div className="mt-4">
              <span className="hidden sm:inline-block mr-4">I'm a </span>
              <span className="text-primary">Frontend Magician 🪄</span>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <GitHubStats username="vivek9patel" />
          </div>
          <div className="text-muted-foreground font-light space-y-1 mt-8">
            <p className="">
              I'm a developer based in{' '}
              <Anchor
                href="https://www.google.com/maps/place/durham+nc/data=!4m2!3m1!1s0x89ace471120f66f1:0xe17ada898a46f27e?sa=X&ved=1t:155783&ictx=111"
                target={'_blank'}
                onClick={() => handleLinkClick('Durham Location')}
              >
                Durham, NC
              </Anchor>
              , with 2 years of experience working with various software
              applications, and teams from US and India. I specialize in
              building{' '}
              <Anchor
                href="https://vivek9patel.github.io/"
                onClick={() => handleLinkClick('Exceptional Link')}
                target={'_blank'}
              >
                exceptional softwares
              </Anchor>
              , applications, backend services and everything in between.
            </p>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-20 sm:mt-32">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-4xl sm:text-5xl font-medium">Experience</div>
          <Button
            variant="outline"
            onClick={() => clientRouter.push('/resume')}
          >
            View Resume
          </Button>
        </div>
        <div className="text-muted-foreground font-light mt-2 mb-4">
          For over 2 years, I have cultivated a deep understanding and expertise
          in <span className="">Front-end Engineering</span>, always
          prioritizing the user's needs. In every project I undertake, my aim is
          to craft tailored, intuitive, and thoroughly tested experiences that
          align the goals of companies with the expectations of users.
        </div>
        <Separator className="my-4" />

        <ExperienceItem
          dateRange="Mar '25 - Present"
          logo="/images/hubspot.svg"
          logoAlt="HubSpot Logo"
          duration="Full Time - Present"
          title="Engineering at"
          company="HubSpot"
          onLinkClick={() => handleLinkClick('HubSpot Link')}
        />

        <ExperienceItem
          dateRange="Jun '24 - Feb'25"
          logo={uopxLogo}
          logoAlt="University of Phoenix Logo"
          duration="Full Time - 9 months"
          title="Engineer II at"
          company="University of Phoenix"
          onLinkClick={() => handleLinkClick('UOPX Link')}
        />

        <ExperienceItem
          dateRange="May '23 - Apr '24"
          logo={uopxLogo}
          logoAlt="University of Phoenix Logo"
          duration="Internship - 1 year"
          title="Software Engineer at"
          company="University of Phoenix"
          description="I develop robust, responsive components with a focus on accessibility, enhancing user experiences alongside Adobe AEM, Adobe ADA, and Adobe Target. Worked on building new microservice with Spring Boot, Java, Elasticsearch, Docker, Terraform and AWS."
          onLinkClick={() => handleLinkClick('UOPX Link')}
        />

        <ExperienceItem
          dateRange="Jan '22 - Jun '22"
          logo={hackerrankLogo}
          logoAlt="Hackerrank Logo"
          duration="Internship - 6 months"
          title="Software Engineer at"
          company="HackerRank"
          description="I contributed to the optimization of a cloud-based Integrated Development Environment (IDE), elevating efficiency. I worked on theia, React.js, Typescript, Docker, and Kubernetes."
          onLinkClick={() => handleLinkClick('Hackerrank Link')}
        />

        <ExperienceItem
          dateRange="Apr '21 - Jun '21"
          logo={hmsLogo}
          logoAlt="100ms Logo"
          duration="Internship - 3 months"
          title="Software Engineer at"
          company="100ms"
          description="I worked with fontend Dashboard team, building a customised video-conferencing app-builder using Next.js, Typescript, Tailwind CSS, Vercel and AWS."
          onLinkClick={() => handleLinkClick('100ms Link')}
        />

        <ExperienceItem
          dateRange="Jun '20 - Mar '21"
          logo={webmateLogo}
          logoAlt="Webmate's Logo"
          duration="Part-time - 9 months"
          title="Co-founder at"
          company="Webmate Web Services"
          description="Led the establishment of an affordable software services platform for small businesses during the pandemic, driving client meeting management and exceptional customer satisfaction."
          onLinkClick={() => handleLinkClick('Webmate Link')}
        />

        <div
          onClick={() => {
            handleLinkClick('Recommendations Link');
            window.open('https://www.linkedin.com/in/vivek9patel/', '_blank');
          }}
          className="text-muted-foreground underline hover:text-ring cursor-pointer"
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
            onClick={() => clientRouter.push('/projects')}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto auto-rows-fr gap-x-5 gap-y-5">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            top6Projects.map((project: any, i) => (
              <ProjectCard key={`${project.id}-${i}`} {...project} />
            ))
          )}
        </div>
      </div>

      {/* Contact email section */}
      <div className="mt-20 sm:mt-32">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <div className="font-light text-muted-foreground mt-4 mb-10">
          I'm always open to new opportunities and connections. Feel free to
          reach out to me at{' '}
          <Anchor
            onClick={() => handleLinkClick('MailTo Link')}
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

export default memo(Home);
