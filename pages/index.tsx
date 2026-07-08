import type { NextPage } from 'next';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import ThemeControls from '@/components/theme-controls';
import HeroSection from '@/components/sections/hero';
import ProjectsSection from '@/components/sections/projects';
import ExperienceSection from '@/components/sections/experience';
import TestimonialsSection from '@/components/sections/testimonials';
import FooterSection from '@/components/sections/footer';

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) ReactGA.initialize(TRACKING_ID);

const Home: NextPage = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'Home' });
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed right-6 top-6 z-50">
        <ThemeControls />
      </div>
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-12 md:pt-16 md:pb-24 space-y-20">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Home;
