import { useVideo, HMSPeer, useHMSStore, selectIsPeerAudioEnabled, selectIsPeerVideoEnabled, HMSTrack } from "@100mslive/react-sdk";
import { BiMicrophone,BiMicrophoneOff } from "react-icons/bi";
import Avatar from "boring-avatars";

export const Peer: React.FC<{ peer: HMSPeer }> = ({ peer }) => {
    const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  return (
    <div className="m-2 relative rounded-lg overflow-hidden shadow-md" style={{ minWidth: "250px", minHeight: "250px" }}>
        <Video mirror={peer.isLocal} videoTrack={peer.videoTrack} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isVideoOn ? "invisible" : "visible"}`}>
            <Avatar
                size={200}
                name={peer.name}
                variant="beam"
                colors={["#162447", "#146A7C", "#00FFC2", "#C271B4", "#FD3A69"]}
            />
        </div>
        <div className="absolute top-2 right-2 flex items-center justify-center">
        <span className='  rounded-full bg-gray-100 mr-2 w-7 h-7 flex items-center justify-center text-black dark:text-black'>
            {!isAudioOn ? <BiMicrophoneOff size={24} /> : <BiMicrophone size={24} />}
        </span>
        <span className=' text-black rounded-md bg-gray-100 px-2'>{peer.name}</span>
        </div>
    </div>
  );
  };
  
 export const Video = ({ videoTrack, mirror }: any) => {
      const { videoRef } = useVideo({
        trackId: videoTrack,
      });
      return (
        <video
          className={` h-full w-full ${mirror ? 'mirror' : ''}`}
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
      );
    };