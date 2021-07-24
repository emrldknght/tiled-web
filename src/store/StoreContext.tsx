import {createContext} from "react";
import { mAppState, MAppState } from "./mStore";

export const StoreContext = createContext<MAppState>(mAppState)