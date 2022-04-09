import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { HMSRoomProvider } from '@100mslive/react-sdk';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return <HMSRoomProvider><Layout><Component {...pageProps} /></Layout></HMSRoomProvider>
}

export default MyApp
