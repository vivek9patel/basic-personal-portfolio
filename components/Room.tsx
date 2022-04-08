import {
  selectPeers,
  useHMSStore,
} from '@100mslive/react-sdk';
import Footer from './Footer';
import { Peer } from './Peer';

const Room = () => {
  const peers = useHMSStore(selectPeers);
  return (
      <>

      <div className='p-4 flex flex-wrap justify-evenly items-center'>
      {peers.map((peer) => (
        <Peer key={peer.id} peer={peer} />
      ))}
      </div>

      <Footer />
    </>
  );
};



export default Room;