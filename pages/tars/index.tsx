import type { NextPage } from 'next';
import TarsChatPanel from '@/components/tars/TarsChatPanel';

const Tars: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      <div className="border border-border rounded-lg bg-card h-full min-h-screen">
        <TarsChatPanel location="page" />
      </div>
    </div>
  );
};

export default Tars;
