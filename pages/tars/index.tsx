import type { NextPage } from 'next';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import TarsChatPanel from '@/components/tars/TarsChatPanel';

const Tars: NextPage = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/tars', title: 'Tars' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <div className="border border-border rounded-lg bg-card h-full min-h-screen">
        <TarsChatPanel />
      </div>
    </div>
  );
};

export default Tars;
