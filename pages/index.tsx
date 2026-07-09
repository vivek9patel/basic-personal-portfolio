import type { GetStaticProps, NextPage } from 'next';
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

interface HomeProps {
  latestPosts: PostSummary[];
}

const Home: NextPage<HomeProps> = ({ latestPosts }) => {
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
