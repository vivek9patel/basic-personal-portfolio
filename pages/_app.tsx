import '../styles/globals.css'
import { HMSRoomProvider } from '@100mslive/react-sdk';
import Layout from '../components/Layout';
import AppContext from '../contexts/AppContext';
import Notifications from '../components/Notifications';
import { useState } from 'react';

function MyApp({ Component, pageProps }: any) {
  const [loader, setLoader] = useState<boolean>(false);
  const [meetActivate, setMeetActivate] = useState<boolean>(false);
  const [leftOnce, setLeftOnce] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [peerDimension, setPeerDimension] = useState<{
    width: number,
    height: number,
  }>({
    width: 700,
    height: 300,
  });

  return (
    <HMSRoomProvider>
      <AppContext.Provider 
        value={{
          state: {
            loader,
            meetActivate,
            leftOnce,
            isOwner,
            peerDimension
          },
          actions: {
            setLoader,
            setMeetActivate,
            setLeftOnce,
            setIsOwner,
            setPeerDimension
          }
        }}
      >
      <Layout>
        <Notifications />
        <Component {...pageProps} />
      </Layout>
      </AppContext.Provider>
    </HMSRoomProvider>
  )
}

export default MyApp
