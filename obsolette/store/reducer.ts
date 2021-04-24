import {initState} from "../../src/store/initState";
import {ReducerActions, reducerActions} from "./reducers";
import {AppState} from "../../src/types";

export const reducer = (state = initState, action: { type: keyof ReducerActions; }): AppState => {
  // console.log('ss', JSON.stringify(state), action);
  const a = reducerActions[action.type];
  if(a && typeof a === 'function') {
    return a(state, action);
  } else {
    if(action.type !== '@@INIT') console.warn('undefined action')
    return state;
  }
}