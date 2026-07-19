import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { SeoHead } from '@/components/meta/seo-head';
import AskLoading from '@/components/ask/AskLoading';
import ThemeControls from '@/components/theme-controls';

const AskPageClient = dynamic(() => import('@/components/ask/AskPageClient'), {
  ssr: false,
  loading: () => <AskLoading />,
});

const AskPage: NextPage = () => {
  return (
    <>
      <SeoHead
        title="Ask TARS"
        description="A generative UI based answer engine for Vivek Patel's portfolio. Ask about experience, projects, and role fit."
        path="/ask"
      />
      <div className="fixed right-6 top-6 z-50">
        <ThemeControls />
      </div>
      <AskPageClient />
    </>
  );
};

export default AskPage;
