import { Dispatch, SetStateAction } from "react";

export interface AppContextInterface {
    state: AppStateInterface;
    actions: AppActionsInterface;
}

interface AppStateInterface {
    [stateName: string]: any
}

interface AppActionsInterface {
    [actionName: string]: Dispatch<SetStateAction<any>>
}