import React from 'react'
import { NextPage } from "next"
import Link from 'next/link'

const VideoCall: NextPage = () => {

  return (
    <div className='p-6 flex flex-col justify-center items-center'>
        <Link href={'/schedule'}>Schedule a Meet with Vivek</Link>
        <Link href={'/join'}>Join Room</Link>
    </div>
  )
}

export default VideoCall
