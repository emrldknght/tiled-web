import {createStore} from "redux";
import {initState} from "./store/initState";

export const PALETTE_SELECT_TILE = 'pst';
export const SET_TILE_SRC = 'setTileSrc';

const reducer = (state = initState, action) => {
  console.log('ss', JSON.stringify(state), action);
  switch (action.type) {
    case SET_TILE_SRC:
      return  { ...state, ...{ tileSrc: action.tileSrc }}
    case 'spt':
      return {...state, ...{ st: action.id}};
      // return state.st = action.id;
    case PALETTE_SELECT_TILE:
      const pal = { ...state.palette };
      pal.selectedTile = action.id;
      return {...state, ...{palette: pal}};
    case 'setMap':
      // const map = [ ...state.map ];
      const newMap = action.mapData;
      return {...state, ...{map: newMap}};
    case 'setTileUrl':
      // console.log('stu', state, action.url);
      return { ...state, ...{ tileUrl: action.url } }
    case 'setTileDim':
      return { ...state, ...{ tileDim: action.dim } }
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

export const store = createStore(reducer);
const update = () => {
  console.log(':', JSON.stringify(store.getState()));
}
store.subscribe(update);

// store.dispatch(spt(1));
// store.dispatch(spt(2));

