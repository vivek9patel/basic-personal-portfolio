import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { useRouter } from 'next/router';

export default function Room() : JSX.Element {
    const router = useRouter();
    const [roomId, setRoomId] = useState<string>('');

    useEffect(() => {
       const currentRoommId = window.location.href.split('/').pop();
        if(currentRoommId){
            setRoomId(currentRoommId)
        }
        else{
            router.push({
                pathname: '/join',
                query: { returnUrl: router.asPath }
            });
        }
    },[])
    return (
        <>
        <Header />
        <div>you joined a room {roomId}</div>
        </>
    )
}