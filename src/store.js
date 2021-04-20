import {applyMiddleware, createStore} from "redux";
import {initState} from "./store/initState";
import {eraseCred, saveCred} from "./lib/creds";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import {saveJson} from "./lib/saveJson";
import {Path} from "./lib/api";

export const PALETTE_SELECT_TILE = 'pst';
export const PALETTE_ADD_CELL = 'PALETTE_ADD_CELL';
export const PALETTE_REMOVE_CELL = 'PALETTE_REMOVE_CELL';
export const SET_TILE_SRC = 'setTileSrc';
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const SET_MAP_TILE = 'SET_MAP_TILE';
export const SAVE_MAP_FILE = 'SAVE_MAP_FILE';
export const TILER_SELECT_CELL = 'TILER_SELECT_CELL';
export const TILER_UPDATE_CELL = 'TILER_UPDATE_CELL';

const prepareData = (state) => JSON.stringify({
  mapData: state.mapData,
  tileDim: state.tileDim,
  tileUrl: state.tileUrl
});

const reducerActions = {
  [AUTH]: (state, action) => {
    // console.log(action);
    const l = action.payload.login;
    const p = action.payload.pass;
    if(l === 'yoba' && p === 'aboy') {
      // console.log('logging');
      saveCred(l, p)
      return { ...state, ...{auth: true} }
    }
    return state;
  },
  [LOGOUT]: (state) => {
    eraseCred();
    return {...state, ...{auth: false}}
  },
  [SET_TILE_SRC]: (state, action) => ({ ...state, ...{ tileSrc: action.tileSrc }}),
  'spt': (state, action) => ({...state, ...{ st: action.id}}),
  [PALETTE_SELECT_TILE]: (state, action) => {
    const pal = {...state.palette};
    pal.selectedTile = action.id;
    return {...state, ...{palette: pal}};
  },
  [PALETTE_ADD_CELL]: (state, action) => {
    const d = action.data;
    // console.log('addCell', d);

    const p = [...state.palette.data];
    p.push(d);
    // console.log(p);

    const pal = {...state.palette};
    pal.data = p;

    return {...state, ...{palette: pal}};
  },
  [PALETTE_REMOVE_CELL]: (state, action) => {
    const id = action.id;
    const p = [...state.palette.data];

    // console.log('removeCell', id, p);
    const np = p.filter(i => i.cid !== id)
    // console.log(np);

    const pal = {...state.palette};
    pal.data = np;
    return {...state, ...{palette: pal}};

  },
  [TILER_SELECT_CELL]: (state, action) => {
    const tiler = { ...state.tiler };
    // console.log('->', action);
    tiler.selectedCell = action.cid;
    return { ...state, ...{ tiler: tiler }};
  },
  [TILER_UPDATE_CELL]: (state, action) => {
    // console.log(':>', action);
    // return state;

    const p = [...state.palette.data];
    console.log(JSON.stringify(p));
    let index = -1; // should be 2
    p.forEach((item, i) => {
      if(item.cid === action.cid) index = i;
    })
    // console.log('index', index);

    const u = {...p[index]};
    // console.log(u);
    u[action.data.k] = action.data.v;

    const np = [
      ...p.slice(0, index),
      u,
      ...p.slice(index + 1)
    ]

    console.log(JSON.stringify(np));
    // return state;

    const pal = {...state.palette};
    pal.data = np;
    return {...state, ...{palette: pal}};
  },
  [SET_MAP_TILE]: (state, action) => {
    const {x, y, id} = action.payload;
    // console.log(`(${x},${y})->${id}`);
    const newState = [...state.mapData];
    newState[y][x] = id;
    // console.log('!', JSON.stringify(newState));
    return {...state, ...{mapData: newState}};
  },
  'setMap': (state, action) => {
    // const map = [ ...state.map ];
    const newMap = action.mapData;
    return {...state, ...{mapData: newMap}};
  },
  'setTileUrl': (state, action) => {
    const url = `${Path}/tilesets/${action.url}`;
    return { ...state, ...{ tileUrl: url } }
  },
  'setTileDim': (state, action) => ({ ...state, ...{ tileDim: action.dim } }),
  'at': (state) => state,
  [SAVE_MAP_FILE]: (state) => {
    const content = prepareData(state);
    console.log('save->', content);
    saveJson(content);
    return state;
  }

}

const reducer = (state = initState, action)  => {
  // console.log('ss', JSON.stringify(state), action);
  const a = reducerActions[action.type];
  if(a && typeof a === 'function') {
    return a(state, action);
  } else {
    if(action.type !== '@@INIT') console.warn('undefined action')
    return state;
  }
}

/*
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
    case SAVE_MAP_FILE:
      const content = prepareData(state);
      console.log('save->', content);
      saveJson(content);
      return state;
    default:
      return state;
  }
}
 */

/*
let state = reducer(undefined, {});
console.log(state);
state = reducer(state, {type: 'spt'});
console.log(state);

 */

// const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(reducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //composeEnhancers
  composeWithDevTools(applyMiddleware(thunk))
  );
const update = () => {
  // console.log(':', JSON.stringify(store.getState()));
}
store.subscribe(update);

// store.dispatch(spt(1));
// store.dispatch(spt(2));

