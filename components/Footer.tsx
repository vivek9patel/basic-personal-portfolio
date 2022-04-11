import { selectIsLocalScreenShared, selectIsSomeoneScreenSharing, selectPeerScreenSharing, useAVToggle, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { HangUpIcon} from '@100mslive/react-icons';
import { BiMicrophone,BiMicrophoneOff,BiVideoOff,BiVideo,BiPhoneCall } from "react-icons/bi";
import { MdStopScreenShare, MdScreenShare } from "react-icons/md";


function Footer() {
  const screenshareOn = useHMSStore(selectIsLocalScreenShared);
  const someoneIsSharingScreen = useHMSStore(selectIsSomeoneScreenSharing);
  const presenter = useHMSStore(selectPeerScreenSharing);
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();

  const toggleScreenShare = async () => {
    if(screenshareOn){
      try {
        await actions.setScreenShareEnabled(false);
      } catch (error) {
          console.error(error)
      }
    }
    else{
      if(someoneIsSharingScreen){
        alert(`${presenter && presenter.name ? presenter.name : "Someone"} is already sharing screen!`);
        return;
      }
      else{
        try {
          await actions.setScreenShareEnabled(true,{
            videoOnly: true
          });
        } catch (error) {
            console.error(error)
        }
      }
    }
    
  }

  return (
    <footer className=" fixed z-50 left-0 bottom-0 py-2 px-4 w-full flex justify-center items-center">
      <button disabled={someoneIsSharingScreen && !screenshareOn} title={`${someoneIsSharingScreen ? "Can't share screen" : `${screenshareOn ? "Stop" : "Start"} Screen Share`}`} className={`${screenshareOn ? "bg-v9-pink" : (someoneIsSharingScreen ? " opacity-50 bg-gray-100" : "bg-white dark:bg-transparent")} h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={toggleScreenShare}>
        {screenshareOn ? <MdStopScreenShare color='white' size={24} /> : <MdScreenShare size={24} />}
      </button>
      <button className={`${isLocalAudioEnabled ? "bg-white dark:bg-transparent" : "bg-v9-pink"} ml-10 mr-5 h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={toggleAudio}>
        {isLocalAudioEnabled ? <BiMicrophone size={24} /> : <BiMicrophoneOff color='white' size={24} />}
      </button>
      <button className={`${isLocalVideoEnabled ? "bg-white dark:bg-transparent" : "bg-v9-pink"} ml-5 mr-10 h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={toggleVideo}>
        {isLocalVideoEnabled ? <BiVideo size={24} /> : <BiVideoOff color='white' size={24} />}
      </button>
      <button className={` bg-violet-900 h-10 w-10 flex justify-center items-center rounded-full shadow-lg transition duration-300 ease-in-out`} onClick={() => actions.leave()}>
        <HangUpIcon color='white' />
      </button>
    </footer>
  );
}

export default Footer;
