import type { NextPage } from 'next'
import Header from '../components/Header'
import VideoCall from '../components/VideoCall'
import { HMSRoomProvider } from '@100mslive/react-sdk';

const Home: NextPage = () => {
  return (
    <HMSRoomProvider>
      <Header />
      <VideoCall />
    </HMSRoomProvider>
  )
}

export default Home
