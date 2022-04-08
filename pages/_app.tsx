import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { HMSRoomProvider } from '@100mslive/react-sdk';

function MyApp({ Component, pageProps }: AppProps) {
  return <HMSRoomProvider><Component {...pageProps} /></HMSRoomProvider>
}

export default MyApp
