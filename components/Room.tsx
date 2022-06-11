import {
  selectIsSomeoneScreenSharing,
  selectPeers,
  selectPeerScreenSharing,
  useHMSActions,
  useHMSStore
} from '@100mslive/react-sdk';
import { useContext, useEffect } from 'react';
import AppContext from '../contexts/AppContext';
import Footer from './Footer';
import { Peer } from './Peer';
import SharedScreen from './SharedScreen';

const Room = () => {  
  const actions = useHMSActions();
  const appState = useContext(AppContext);
  useEffect(() => {
    return () => {
      appState.actions.setLeftOnce(true);
      actions.leave()
    }
  }, [])
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
    <div className={` ${screenshareOn ? "presenter-layout" : "participants-layout"} transition-all duration-300 w-full h-full `}>
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