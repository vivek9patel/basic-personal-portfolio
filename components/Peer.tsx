import {
  HMSPeer,
  useHMSStore,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectPeerAudioByID,
  selectCameraStreamByPeerID,
  useHMSActions,
} from "@100mslive/react-sdk";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import Avatar from "boring-avatars";
import { MutableRefObject, useContext, useEffect, useRef } from "react";
import AppContext from "../contexts/AppContext";

export const Peer: React.FC<{ peer: HMSPeer }> = ({ peer }) => {
  const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const audioLevel = useHMSStore(selectPeerAudioByID(peer.id));
  const videoRef = useRef(null);
  const {
    state: { peerDimension },
  } = useContext(AppContext);

  return (
    <div
      style={{
        // height: peerDimension.height,
        // width: peerDimension.width,
        // minHeight: "300px",
        // maxHeight: getHeight(),
        flex: peerDimension.numberOfRows > 1 ? "0 0 24%" : "",
      }}
      className={` dark:bg-gray-800 bg-opacity-50 bg-gray-100 relative rounded-lg shadow-md border-0 dark:border-4 transition duration-500 overflow-hidden flex justify-center items-center ${
        audioLevel > 0 ? " border-v9-pink" : " dark:border-white "
      }`}
    >
      <Video videoRef={videoRef} peer={peer} />
      <div
        className={`absolute bg-opacity-60 hidden sm:flex h-full w-full backdrop-filter backdrop-blur-sm justify-center items-center z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isVideoOn ? "invisible" : "visible"
        }`}
      >
        <Avatar
          size={"80%"}
          name={peer.name}
          variant="ring"
          colors={["#162447", "#146A7C", "#00FFC2", "#C271B4", "#FD3A69"]}
        />
      </div>
      <div
        style={{ maxWidth: "90px" }}
        className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center overflow-hidden text-ellipsis ${
          isVideoOn
            ? "-top-1 translate-y-0 bg-gray-100 px-2 text-black rounded-b-lg font-normal text-md py-0.5"
            : "text-white font-medium text-xl"
        }`}
      >
        {peer.name}
      </div>
      <div className="absolute top-2 right-2 flex items-center justify-center z-10">
        <span className="  rounded-full bg-gray-100 mr-2 w-7 h-7 flex items-center justify-center text-black ">
          {!isAudioOn ? (
            <BiMicrophoneOff size={24} />
          ) : (
            <BiMicrophone size={24} />
          )}
        </span>
        {/* <span className=' text-black rounded-md bg-gray-100 px-2'>{peer.name}</span> */}
      </div>
    </div>
  );
};

export const Video = ({
  peer,
  videoRef,
}: {
  peer: HMSPeer;
  videoRef: MutableRefObject<null>;
}) => {
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <video className="z-0 flex-1" ref={videoRef} autoPlay muted playsInline />
  );
};
