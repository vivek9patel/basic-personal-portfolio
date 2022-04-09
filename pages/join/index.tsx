import type { NextPage } from 'next'
import Link from 'next/link';
import { useState } from 'react';

const JoinRoom: NextPage = () => {

    const [roomId, setRoomId] = useState<string>('');

  return (
    <>
            <div className='flex flex-col p-6 justify-center items-center'>
                <input className='px-2 py-1 text-black' value={roomId} placeholder="Enter a room ID to join" type="text" name="roomId" onChange={(e) => {
                    setRoomId(e.target.value)
                }} />
                <Link href={`/join/${roomId}`}>Join Room</Link>
            </div>
    </>
  )
}

export default JoinRoom
