import {AppState, initState} from "./initState";
import {ReducerActions, reducerActions} from "./reducers";

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