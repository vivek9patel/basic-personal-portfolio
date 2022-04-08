import type { NextPage } from 'next'
import Header from '../components/Header'
import VideoCall from '../components/VideoCall'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <VideoCall />
    </>
  )
}

export default Home
