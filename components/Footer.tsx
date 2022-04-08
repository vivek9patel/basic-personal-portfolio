import { useAVToggle, useHMSActions } from '@100mslive/react-sdk';
import {
  MicOffIcon,
  MicOnIcon,
  VideoOffIcon,
  VideoOnIcon,
  HangUpIcon,
} from '@100mslive/react-icons';

function Footer() {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();
  return (
    <footer>
      <button onClick={toggleAudio}>
        {isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
      </button>
      <button onClick={toggleVideo}>
        {isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
      </button>
      <button onClick={() => actions.leave()}>
        <HangUpIcon />
      </button>
    </footer>
  );
}

export default Footer;
