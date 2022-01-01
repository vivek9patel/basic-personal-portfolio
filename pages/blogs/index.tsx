import type { NextPage } from 'next'
import Header from '../../components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className='mx-20 px-6 py-6'>
        <div className=' text-v9-pink font-bold text-6xl'>Hello World!</div>
      </div>
    </>
  )
}

export default Home
