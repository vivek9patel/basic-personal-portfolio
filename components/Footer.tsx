import { useAVToggle, useHMSActions } from '@100mslive/react-sdk';
import { HangUpIcon} from '@100mslive/react-icons';
import { BiMicrophone,BiMicrophoneOff,BiVideoOff,BiVideo,BiPhoneCall } from "react-icons/bi";


function Footer() {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();
  return (
    <footer className=" fixed left-0 bottom-0 w-full py-2 px-4 flex justify-center items-center">
    <button className={`${isLocalAudioEnabled ? "" : "bg-v9-pink"} h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={toggleAudio}>
        {isLocalAudioEnabled ? <BiMicrophone size={24} /> : <BiMicrophoneOff color='white' size={24} />}
      </button>
      <button className={`${isLocalVideoEnabled ? "" : "bg-v9-pink"} mx-10 h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={toggleVideo}>
        {isLocalVideoEnabled ? <BiVideo size={24} /> : <BiVideoOff color='white' size={24} />}
      </button>
      <button className={` bg-violet-900 h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={() => actions.leave()}>
        <HangUpIcon color='white' />
      </button>
    </footer>
  );
}

export default Footer;
