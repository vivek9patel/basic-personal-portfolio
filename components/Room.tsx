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
    <main>
      {peers.map((peer) => (
        <Peer key={peer.id} peer={peer} />
      ))}
    </main>
    <Footer />
    </>
  );
};



export default Room;