import type { NextPage } from 'next'
import Header from '../../components/Header'

const CreateRoom: NextPage = () => {

    const createRoom = () => {}

  return (
    <>
      <Header />
        <div className='flex flex-col p-6 justify-center items-center'>
            <button className='p-2 bg-blue-500 rounded-lg mt-4' onClick={createRoom}>Create Room</button>
        </div>
    </>
  )
}

export default CreateRoom
