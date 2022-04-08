import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { useRouter } from 'next/router';
import { useHMSActions, useHMSStore, selectRoomState} from '@100mslive/react-sdk';
import Room from "../../components/Room";
import {v4} from 'uuid';

import { BiMicrophone,BiMicrophoneOff,BiVideoOff,BiVideo,BiPhoneCall } from "react-icons/bi";
import Avatar from "boring-avatars";

const randomName = v4();

export default function Conference() : JSX.Element {
    const router = useRouter();
    const roomState = useHMSStore(selectRoomState);
    const [roomId, setRoomId] = useState('');
    

    useEffect(() => {
       const currentRoommId = window.location.href.split('/').pop();
        if(currentRoommId){
            setRoomId(currentRoommId);
        }
        else{
            router.push({
                pathname: '/join'
            });
        }
    },[])

    const getRoomStateJSX = () => {
        switch(roomState){
            case "Connected":
                return <Room />
            case "Connecting":
                return "Connecting..."
            case "Disconnecting":
                return "Disconnecting..."
            case "Reconnecting":
                return "Reconnecting..."
            default:
                return (
                    <JoinRoomForm roomId={roomId} />
                )
        }
    }

    return (
        <>
        <Header loader={roomState === 'Connecting'} />
        <div className="mt-4">
        {getRoomStateJSX()}
        </div>
        </>
    )
}

type joinRoomProps = {
    roomId: string
}

const JoinRoomForm = ({roomId}: joinRoomProps) => {
    const [name, setName] = useState('');
    const [muteMic, setMuteMic] = useState(false)
    const [muteWebCam, setMuteWebCam] = useState(false)
    const hmsActions = useHMSActions();

    useEffect(() => {
        return stopWebCam
    },[])

    useEffect(() => {
        if(muteWebCam) stopWebCam()
        else startWebCam();
    },[muteWebCam])

    const joinRoom = async () => {
        try {
            const response = await fetch('/api/token', {
                method: 'POST',
                body: JSON.stringify({ role: 'guest', roomId }),
            });
            const { token } = await response.json();
            hmsActions.join({
                userName: name || 'Anonymous',
                authToken: token,
                settings: {
                    isAudioMuted: muteMic,
                    isVideoMuted: muteWebCam
                },
            });
          } catch (error) {
            console.error(error);
        }
    }

    const startWebCam = () => {
        var video: HTMLVideoElement | null = document.querySelector("#webCamEle");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                if(video) video.srcObject = stream;
            })
            .catch(function (err) {
                console.log("Something went wrong!", err);
                stopWebCam();
            });
        }
    }

    const stopWebCam = () => {
        var video: HTMLVideoElement | null = document.querySelector("#webCamEle");
        if(video){
            var stream = video.srcObject;
            if(!stream) return;
            // @ts-ignore
            var tracks = stream.getTracks();
        
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.stop();
            }
        
            video.srcObject = null;
        }
      }

    return (
        <form className="flex justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        joinRoom();
                    }}
                    >
                    <div className="rounded-lg overflow-hidden shadow-lg bg-white max-w-sm">
                        <div className="w-96 h-72 relative">
                        <video className="w-full h-full" autoPlay id="webCamEle"></video>
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${muteWebCam ? "visible" : "invisible"}`}>
                            <Avatar
                                size={200}
                                name={randomName}
                                variant="beam"
                                colors={["#162447", "#146A7C", "#00FFC2", "#C271B4", "#FD3A69"]}
                            />
                        </div>
                        </div>
                        <div className="p-6">
                        <h5 className="text-gray-900 text-center text-xl font-medium mb-2">Join vivek&apos;s Room</h5>
                        <div className="flex justify-center">
                            <div className="mb-3 xl:w-96">
                                <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                maxLength={20}
                                minLength={2}
                                className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                placeholder="Enter your username"
                                />
                            </div>
                            </div>
                        <div className="flex mt-4 justify-evenly items-center w-full dark:text-black">
                            <button className={`${muteMic ? " bg-v9-pink " : ""} w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out`} type="button" onClick={() => {
                                setMuteMic(!muteMic)
                            }} >
                                {
                                    muteMic ?
                                    <BiMicrophoneOff color="white" size={'24px'} />
                                    :
                                    <BiMicrophone size={'24px'} />
                                }
                            </button>
                            <button
                                type="submit"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                <BiPhoneCall size={'24px'} />
                            </button>
                            <button className={`${muteWebCam ? " bg-v9-pink " : ""} w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out`} type="button" onClick={() => {
                                setMuteWebCam(!muteWebCam)
                            }} >
                                {
                                    muteWebCam ?
                                    <BiVideoOff color="white" size={'24px'} />
                                    :
                                    <BiVideo size={'24px'} />
                                }
                            </button>
                        </div>
                        </div>
                    </div>
                    </form>
    )
}