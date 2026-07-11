import type { GetStaticProps, NextPage } from 'next';
import ThemeControls from '@/components/theme-controls';
import { AnimatedSection } from '@/components/animated-section';
import HomeSidebar from '@/components/home-sidebar';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import WritingSection from '@/components/sections/writing';
import TestimonialsSection from '@/components/sections/testimonials';
import SocialWallSection from '@/components/sections/social-wall';
import FooterSection from '@/components/sections/footer';
import { SeoHead } from '@/components/meta/seo-head';
import { SITE_DESCRIPTION } from '@/lib/site-config';
import { buildPersonJsonLd, buildWebSiteJsonLd } from '@/lib/seo';
import type { PostSummary } from '@/interfaces/post.interface';
import type { SocialWallItem } from '@/interfaces/social-wall.interface';

interface HomeProps {
  latestPosts: PostSummary[];
  socialWallItems: SocialWallItem[];
}

const Home: NextPage<HomeProps> = ({ latestPosts, socialWallItems }) => {
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
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-10 pb-12 md:pt-16 md:pb-24">
          <div className="lg:grid lg:grid-cols-[1fr_minmax(0,56rem)_1fr] lg:gap-x-16 xl:gap-x-20">
            <HomeSidebar />
            <AnimatedSection className="mx-auto w-full max-w-4xl lg:mx-0 lg:max-w-none">
              <main className="space-y-20">
                <HeroSection />
                <ProjectsSection />
                <ExperienceSection />
                <WritingSection posts={latestPosts} />
                <TestimonialsSection />
                <SocialWallSection items={socialWallItems} />
                <FooterSection />
              </main>
            </AnimatedSection>
            <div className="hidden lg:block" aria-hidden />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { getAllPosts } = await import('@/lib/mdx');
  const { SOCIAL_WALL_SOURCES } = await import('@/data/social-wall-sources');
  const { fetchSocialWallItems } =
    await import('@/lib/social-wall/fetch-social-wall-items');
  const posts = await getAllPosts();
  const socialWallItems = await fetchSocialWallItems(SOCIAL_WALL_SOURCES);

  return {
    props: {
      latestPosts: posts.slice(0, 3),
      socialWallItems,
    },
    revalidate: 3600,
  };
};

export default Home;
