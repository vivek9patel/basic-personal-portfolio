import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header'

const CreateRoom: NextPage = () => {
    const router = useRouter();
    const [roomName, setRoomName] = useState<string>('');
    const [roomDescription, setRoomDescription] = useState<string>('');


    const createRoom = async () => {
        try {
            const response = await fetch('/api/create_room', {
              method: 'POST',
              body: JSON.stringify({ name: 'test', description: '-' }),
            });
            const data = await response.json();
            if(data && data.id) {
                console.log("data", data)
                router.push({
                    pathname: `/join/${data.id}`,
                })
            }
            else throw Error("Something went wrong!")
          } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
      <Header />
        <form onSubmit={(e) =>{
            e.preventDefault();
            createRoom();
        }} className='flex flex-col p-6 justify-center items-center'>
            <input required minLength={2} maxLength={20} className='px-2 py-1 text-black' value={roomName} placeholder="Enter room name" type="text" name="roomName" onChange={(e) => {
                setRoomName(e.target.value)
            }} />
            <input className='px-2 py-1 mt-2 text-black' value={roomDescription} placeholder="Enter room description" type="text" name="roomDesc" onChange={(e) => {
                setRoomDescription(e.target.value)
            }} />
            <button type='submit' className='p-2 bg-blue-500 rounded-lg mt-4'>Create Room</button>
        </form>
    </>
  )
}

export default CreateRoom
