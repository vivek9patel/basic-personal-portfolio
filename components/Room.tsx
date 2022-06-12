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
      appState.actions.setMeetActivate(false);
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
  const appState = useContext(AppContext);

  useEffect(() => {
    // set window resize observer
    const handleResize = () => {
      const numberOfRows = (Math.floor((peers.length / 4)) + 1)
      const peerWidth = Math.floor((window.innerWidth - 50) / peers.length)
      const peerHeight = Math.floor(numberOfRows > 1 ? (window.innerHeight - 150) / numberOfRows : peerWidth * (9/16) )
      appState.actions.setPeerDimension({
        width: peerWidth,
        height: peerHeight,
        numberOfRows
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [peers])

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