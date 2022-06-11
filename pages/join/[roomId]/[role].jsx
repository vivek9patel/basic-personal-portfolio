import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ErrorPage from "next/error";
import ConferencePage from './index'
import AppContext from "../../../contexts/AppContext";

export default function RoleBasedRoom() {
    const router = useRouter();
    const appState = useContext(AppContext)

    useEffect(() => {
        const isOwner = router.query.role === process.env.NEXT_PUBLIC_ADMIN_NAME
        appState.actions.setIsOwner(isOwner)

        if(isOwner) router.push(`/join/${router.query.roomId}`)
    },[router.query])

    return <ErrorPage title="nice try!" statusCode={404} />
}