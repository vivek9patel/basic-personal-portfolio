import { Dispatch, SetStateAction } from "react";

export interface AppContextInterface {
    state: AppStateInterface;
    actions: AppActionsInterface;
}

interface AppStateInterface {
    loader: boolean;
    meetActivate: boolean;
}

interface AppActionsInterface {
    setLoader: Dispatch<SetStateAction<boolean>>;
    setMeetActivate: Dispatch<SetStateAction<boolean>>;
}