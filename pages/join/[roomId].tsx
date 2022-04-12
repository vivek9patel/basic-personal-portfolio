import { useContext, useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { useHMSActions, useHMSStore, selectRoomState, selectLocalPeer, useAVToggle, useVideo} from '@100mslive/react-sdk';
import Room from "../../components/Room";
import {v4} from 'uuid';

import { BiMicrophone,BiMicrophoneOff,BiVideoOff,BiVideo,BiPhoneCall } from "react-icons/bi";
import Avatar from "boring-avatars";
import AppContext from "../../contexts/AppContext";
import { Video } from "../../components/Peer";

const randomName = v4();

export default function Conference() : JSX.Element {
    const appState = useContext(AppContext);
    const roomState = useHMSStore(selectRoomState);
    
    const {setLoader, setMeetActivate} = appState.actions;

    const getRoomStateJSX = () => {
        switch(roomState){
            case "Connected":
                setLoader(false);
                setMeetActivate(true);
                return <Room />
            case "Connecting":
                setLoader(true);
                return null
            case "Disconnecting":
                setLoader(true);
                setMeetActivate(false);
                return null
            case "Reconnecting":
                setLoader(true);
                return null
            default:
                setLoader(false);
                setMeetActivate(false);
                return (
                    <JoinRoomForm />
                )
        }
    }

    return (
        <>
        {getRoomStateJSX()}
        </>
    )
}

const JoinRoomForm = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const appState = useContext(AppContext);

    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo,
      } = useAVToggle();

    const hmsActions = useHMSActions();
    const localPeer = useHMSStore(selectLocalPeer);
    const router = useRouter();

    useEffect(() => {
        if(!appState.state.leftOnce) joinPreview();
    },[])

    const getCurrentRoomId = () => {
        let currentRoommId: string | undefined;

        if(router.query.hasOwnProperty('roomId')) {
            currentRoommId = router.query['roomId'] as string;
        }
        else{
            currentRoommId = window.location.href.split('/').pop();
        }
        console.log("currentRoommId10", currentRoommId);

        if(currentRoommId){
            return currentRoommId
        }
        else{
            router.push({
                pathname: '/join'
            });
        }
    }

    const getClientSideToken: () => Promise<string> = async () => {
        try{
            let userName = 'guest', role = 'guest';
            if(name){
                if(name === process.env.NEXT_PUBLIC_ADMIN_NAME){
                    userName = 'vivek';
                    role = process.env.NEXT_PUBLIC_ADMIN_ROLE as string;
                }
                else userName = name
            }

            const roomId = getCurrentRoomId();

            const response = await fetch('/api/token', {
                method: 'POST',
                body: JSON.stringify({ role, roomId }),
            });

            const { token } = await response.json();
            return token;
        }
        catch(e){
            alert("Error! Please refresh the page!");
        }
    }

    const joinPreview = async () => {
        try {
            const authToken = await getAuthToken();
            const config = {
                userName: 'guest',
                authToken,
                settings: {
                    isAudioMuted: isLocalAudioEnabled,
                    isVideoMuted: isLocalVideoEnabled
                },
            };
            await hmsActions.preview(config);
          } catch (error) {
            console.error(error);
        }
    }

    const getAuthToken: () => Promise<string> = async () => {
        if(token === null){
            const newToken = await getClientSideToken();
            return newToken;
        }
        return token;
    }

    const joinRoom = async () => {
        const authToken = await getAuthToken();
        hmsActions.join({
            userName: name,
            authToken,
            settings: {
                isAudioMuted: isLocalAudioEnabled,
                isVideoMuted: isLocalVideoEnabled
            },
        });
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
                        {localPeer && <Video mirror={localPeer.isLocal} videoTrack={localPeer.videoTrack} />}
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isLocalVideoEnabled ? "invisible" : "visible"}`}>
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
                            <button className={`${isLocalAudioEnabled ? "" : "bg-v9-pink"} w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out`} type="button" onClick={toggleAudio} >
                                {
                                    isLocalAudioEnabled ?
                                    <BiMicrophone size={'24px'} />
                                    :
                                    <BiMicrophoneOff color="white" size={'24px'} />
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
                            <button className={`${isLocalVideoEnabled ? "" : "bg-v9-pink"} w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300 ease-in-out`} type="button" onClick={toggleVideo} >
                                {
                                    isLocalVideoEnabled ?
                                    <BiVideo size={'24px'} />
                                    :
                                    <BiVideoOff color="white" size={'24px'} />
                                }
                            </button>
                        </div>
                        </div>
                    </div>
                    </form>
    )
}