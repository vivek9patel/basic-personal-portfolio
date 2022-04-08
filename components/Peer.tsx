import { useVideo, HMSPeer, useHMSStore, selectIsPeerAudioEnabled, selectIsPeerVideoEnabled } from "@100mslive/react-sdk";
import { MicOffIcon, MicOnIcon } from '@100mslive/react-icons';

export const Peer: React.FC<{ peer: HMSPeer }> = ({ peer }) => {
    const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  return (
    <div className='tile'>
      {!isVideoOn && "video off"}
      <span className='name'>{peer.name}</span>
       <Video mirror={peer.isLocal} videoTrack={peer.videoTrack} />
      <span className='audio'>
        {!isAudioOn ? <MicOffIcon /> : <MicOnIcon />}
      </span>
    </div>
  );
  };
  
  const Video = ({ videoTrack, mirror }: any) => {
      const { videoRef } = useVideo({
        trackId: videoTrack,
      });
      return (
        <video
          className={mirror ? 'mirror' : ''}
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
      );
    };