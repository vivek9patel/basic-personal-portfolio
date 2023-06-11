import React from "react";
import Link from "next/link";

const VideoCall = () => {
  return (
    <div className="h-full flex flex-col justify-between px-4 w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]">
      <div className="flex-1 flex justify-center text-center items-center">
        <div>
          <div className="text-2xl font-bold">
            Discover New Connection by Scheduling Fun Meet!
          </div>
          <div className=" dark:text-v9-light-grey mt-4 text-v9-dark-grey">
            Schedule a virtual metting by clicking the button below. You can
            select any time and date as per your availibility and we will meet
            at this website for a fun conversation!
          </div>
          <div className=" dark:text-v9-light-grey font-thin mt-8 text-v9-dark-grey">
            Sorry about the Lazy design : )
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col justify-center mx-2">
        <Link href={"/schedule"}>
          <button
            className={` font-light whitespace-nowrap flex justify-center items-center dark:bg-v9-secondary-black px-3 py-1 border-2 rounded-md dark:border-opacity-5 border-opacity-0 bg-blue-600 text-white transition-colors hover:border-v9-pink hover:border-opacity-30`}
            type="button"
          >
            Schedule a fun chat with Vivek
          </button>
        </Link>
        <Link href={"/join"}>
          <button
            className={` font-light mt-4 whitespace-nowrap flex justify-center items-center px-3 py-1 border-2 rounded-md border-opacity-50 transition-colors hover:border-v9-pink hover:border-opacity-30 `}
            type="button"
          >
            Join Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoCall;
