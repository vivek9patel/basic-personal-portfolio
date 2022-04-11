import {
  selectIsSomeoneScreenSharing,
  selectPeers,
  selectPeerScreenSharing,
  useHMSStore
} from '@100mslive/react-sdk';
import Footer from './Footer';
import { Peer } from './Peer';
import SharedScreen from './SharedScreen';

const Room = () => {  
  return (
      <>
      <RoomLayout />
      <Footer />
    </>
  );
};

const RoomLayout = () => {
  const peers = useHMSStore(selectPeers);
  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);
  const presenter = useHMSStore(selectPeerScreenSharing);


  return (
    <div className={` ${screenshareOn ? "presenter-layout" : "participants-layout"} transition-all duration-300 flex-1`}>
      <div className='presenter-view'>
        {
          presenter  && <SharedScreen presenter={presenter} />
        }
      </div>
      <div className='participants-view'>
        <div className='video-gallery  overflow-scroll h-full w-full'>
          {peers.map((peer, index) => (
            <Peer key={index} peer={peer} />
          ))} 
        </div>
      </div>
    </div>
  )
}

export default Room;