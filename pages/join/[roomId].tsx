import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { useRouter } from 'next/router';
import { useHMSActions, useHMSStore, selectRoomState} from '@100mslive/react-sdk';
import Room from "../../components/Room";

export default function Conference() : JSX.Element {
    const router = useRouter();
    const roomState = useHMSStore(selectRoomState);
    const hmsActions = useHMSActions();
    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('');

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
            });
          } catch (error) {
            console.error(error);
        }
    }

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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            joinRoom();
                        }}
                    >
                        <div>Join Room </div>
                            <input
                            className="text-black"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            type='text'
                            placeholder='Enter Name'
                            maxLength={20}
                            minLength={2}
                        />
                        <button type='submit'>Join</button>
                    </form>
                )
        }
    }

    return (
        <>
        <Header />
        {getRoomStateJSX()}
        </>
    )
}