import React from "react";
import { AppContextInterface } from "../interfaces/AppContext";

const AppContext = React.createContext<AppContextInterface>({} as AppContextInterface);

export default AppContext;