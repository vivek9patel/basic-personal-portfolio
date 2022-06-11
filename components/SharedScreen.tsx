import { selectScreenShareByPeerID, useHMSStore, HMSPeer, useVideo } from "@100mslive/react-sdk"

export default function SharedScreen({presenter}: {presenter: HMSPeer}) {
  const screenShareVideoTrack = useHMSStore(selectScreenShareByPeerID(presenter.id))
  const { videoRef } = useVideo({
    trackId: screenShareVideoTrack?.id,
  });
  return (
    <video
      className={`flex-1`}
      style={{maxHeight: "calc(100vh - 150px)"}}
      ref={videoRef}
      autoPlay
      muted
      playsInline
    />
  );
}