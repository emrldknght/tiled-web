import {createStore} from "redux";
import {initState} from "./store/initState";
import {eraseCred, saveCred} from "./lib/creds";

export const PALETTE_SELECT_TILE = 'pst';
export const SET_TILE_SRC = 'setTileSrc';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const SET_MAP_TILE = 'SET_MAP_TILE';

const reducer = (state = initState, action) => {
  console.log('ss', JSON.stringify(state), action);
  switch (action.type) {
    case AUTH:
      console.log(action);
      const l = action.payload.login;
      const p = action.payload.pass;
      if(l === 'yoba' && p === 'aboy') {
        console.log('logging');
        saveCred(l, p)
        return { ...state, ...{auth: true} }
      }
      return state;
    case LOGOUT:
      eraseCred();
      return { ...state, ...{auth: false} }
    case SET_TILE_SRC:
      return  { ...state, ...{ tileSrc: action.tileSrc }};
    case 'spt':
      return {...state, ...{ st: action.id}};
      // return state.st = action.id;
    case PALETTE_SELECT_TILE:
      const pal = { ...state.palette };
      pal.selectedTile = action.id;
      return {...state, ...{palette: pal}};
    case SET_MAP_TILE:
      const { x, y, id } = action.payload;
      // console.log(`(${x},${y})->${id}`);
      const newState = [...state.map];
      newState[y][x] = id;
      // console.log('!', JSON.stringify(newState));
      return {...state, ...{ map:newState }};
    case 'setMap':
      // const map = [ ...state.map ];
      const newMap = action.mapData;
      return {...state, ...{map: newMap}};
    case 'setTileUrl':
      // console.log('stu', state, action.url);
      return { ...state, ...{ tileUrl: action.url } };
    case 'setTileDim':
      return { ...state, ...{ tileDim: action.dim } };
    case 'at':
      return state;
    default:
      return state;
  }
}

/*
let state = reducer(undefined, {});
console.log(state);
state = reducer(state, {type: 'spt'});
console.log(state);

 */

export const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
const update = () => {
  console.log(':', JSON.stringify(store.getState()));
}
store.subscribe(update);

// store.dispatch(spt(1));
// store.dispatch(spt(2));

