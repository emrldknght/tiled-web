import {createContext} from "react";
import {MAppStateT} from "./mStore";
import {initState} from "./initState";

export const StoreContext = createContext<MAppStateT>(initState)