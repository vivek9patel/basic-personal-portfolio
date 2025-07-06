import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Context from '../context';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react';
import Cursor from '../components/Cursor';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import FloatingButtonGroup from '../components/FloatingButtonGroup';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [currentLink, setCurrentLink] = useState('');
  const clientRouter = useRouter();
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    setCurrentLink(clientRouter.pathname.split('/')[1]);
  }, [clientRouter.pathname]);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // disableTransitionOnChange
      >
        <SessionProvider session={pageProps.session}>
          <Context>
            <Cursor />
            <Header loading={loading} currentLink={currentLink} />
            <div className="w-full flex justify-center">
              <div className=" px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]">
                <Component {...pageProps} />
              </div>
            </div>
            {currentLink !== 'tars' && <Footer />}
            <FloatingButtonGroup currentLink={currentLink} />
          </Context>
        </SessionProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
