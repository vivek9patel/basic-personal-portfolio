import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const JoinRoom: NextPage = () => {
  const [roomId, setRoomId] = useState<string>("");

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col p-6 justify-center items-center px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]">
        <input
          className="px-4 py-2 text-black rounded w-full border-2"
          value={roomId}
          placeholder="Enter a room ID to join"
          type="text"
          name="roomId"
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />
        <Link href={`/join/${roomId}`}>
          <button
            className={` w-full mt-4 font-light whitespace-nowrap flex justify-center items-center dark:bg-v9-secondary-black px-3 py-1 border-2 rounded-md dark:border-opacity-5 border-opacity-0 bg-blue-600 text-white transition-colors hover:border-v9-pink hover:border-opacity-30`}
            type="button"
          >
            Join Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
