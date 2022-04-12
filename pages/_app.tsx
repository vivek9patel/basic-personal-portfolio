import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { HMSRoomProvider } from '@100mslive/react-sdk';
import Layout from '../components/Layout';
import AppContext from '../contexts/AppContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [loader, setLoader] = useState<boolean>(false);
  const [meetActivate, setMeetActivate] = useState<boolean>(false);
  const [leftOnce, setLeftOnce] = useState<boolean>(false);
  return (
    <HMSRoomProvider>
      <AppContext.Provider 
        value={{
          state: {
            loader,
            meetActivate,
            leftOnce
          },
          actions: {
            setLoader,
            setMeetActivate,
            setLeftOnce
          }
        }}
      >
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </AppContext.Provider>
    </HMSRoomProvider>
  )
}

export default MyApp
