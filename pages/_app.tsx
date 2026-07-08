import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Context from '../context';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import TarsWidget from '@/components/TarsWidget';
import Cursor from '@/components/Cursor';
import Banner from '@/components/sections/banner';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SessionProvider session={pageProps.session}>
        <Context>
          <Cursor />
          <Banner variant={isHome ? 'top' : 'sides'} />
          <Component {...pageProps} />
          <TarsWidget />
        </Context>
      </SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default MyApp;
