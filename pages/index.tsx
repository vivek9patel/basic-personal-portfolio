import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import ThemeControls from '@/components/theme-controls';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import WritingSection from '@/components/sections/writing';
import TestimonialsSection from '@/components/sections/testimonials';
import FooterSection from '@/components/sections/footer';
import { SeoHead } from '@/components/meta/seo-head';
import { SITE_DESCRIPTION } from '@/lib/site-config';
import { buildPersonJsonLd, buildWebSiteJsonLd } from '@/lib/seo';
import type { PostSummary } from '@/interfaces/post.interface';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

interface HomeProps {
  latestPosts: PostSummary[];
}

const Home: NextPage<HomeProps> = ({ latestPosts }) => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });
  }, []);

  return (
    <>
      <SeoHead
        title="Vivek Patel"
        description={SITE_DESCRIPTION}
        path="/"
        jsonLd={[buildWebSiteJsonLd(), buildPersonJsonLd()]}
      />
      <div className="relative min-h-screen">
        <div className="fixed right-6 top-6 z-50">
          <ThemeControls />
        </div>
        <main className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-24 space-y-20">
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <WritingSection posts={latestPosts} />
          <TestimonialsSection />
          <FooterSection />
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { getAllPosts } = await import('@/lib/mdx');
  const posts = await getAllPosts();

  return {
    props: {
      latestPosts: posts.slice(0, 3),
    },
  };
};

export default Home;
