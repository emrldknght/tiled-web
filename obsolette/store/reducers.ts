import {eraseCred, saveCred} from "../../src/lib/creds";
import {AppState, PalCell, TileSrc} from "../../src/types";
import {Path} from "../../src/lib/api";
import {saveJson} from "../../src/lib/saveJson";
import {getMapDataFromState} from "../../src/lib/getMapDataFromState";
import {
  AUTH,
  LOGOUT,
  PALETTE_ADD_CELL,
  PALETTE_REMOVE_CELL,
  PALETTE_SELECT_TILE, SAVE_DATA, SAVE_MAP_FILE, SET_MAP_TILE,
  SET_TILE_SRC,
  TILER_SELECT_CELL, TILER_UPDATE_CELL
} from "./actionTypes";

const prepareData = (state: AppState) => JSON.stringify({
  mapData: state.mapData,
  tileDim: state.tileDim,
  tileUrl: state.tileUrl
});

export type ReducerActions = {
  [p: string]: (state: AppState, action: any) => AppState
}

export const reducerActions: ReducerActions = {
  [AUTH]: (state: AppState, action: { payload: { login: string; pass: string; }; }) => {
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
  [LOGOUT]: (state: AppState) => {
    eraseCred();
    return {...state, ...{auth: false}}
  },
  [SET_TILE_SRC]: (state: AppState, action: { tileSrc: TileSrc; }) => ({ ...state, ...{ tileSrc: action.tileSrc }}),
  'spt': (state: AppState, action: { id: number; }) => ({...state, ...{ st: action.id}}),
  [PALETTE_SELECT_TILE]: (state: AppState, action: { id: number; }) => {
    const pal = {...state.palette};
    pal.selectedTile = action.id;
    return {...state, ...{palette: pal}};
  },
  [PALETTE_ADD_CELL]: (state: AppState, action: { data: PalCell; }) => {
    const d = action.data;
    // console.log('addCell', d);

    const p = [...state.palette.data];
    p.push(d);
    // console.log(p);

    const pal = {...state.palette};
    pal.data = p;

    return {...state, ...{palette: pal}};
  },
  [PALETTE_REMOVE_CELL]: (state: AppState, action: { cid: string; }) => {
    const cid = action.cid;
    const p = [...state.palette.data];

    // console.log('removeCell', id, p);
    const np = p.filter(i => i.cid !== cid)
    // console.log(np);

    const pal = {...state.palette};
    pal.data = np;
    return {...state, ...{palette: pal}};

  },
  [TILER_SELECT_CELL]: (state: AppState, action: { cid: string }) => {
    const tiler = { ...state.tiler };
    // console.log('->', action);
    tiler.selectedCell = action.cid;
    return { ...state, ...{ tiler: tiler }};
  },
  [TILER_UPDATE_CELL]: (state: AppState, action: { cid: string; data: { k: string ; v: string | number; }; }) => {
    // console.log(':>', action);
    // return state;

    const p: PalCell[] = [...state.palette.data];
    console.log(JSON.stringify(p));
    let index = -1; // should be 2
    p.forEach((item, i) => {
      if(item.cid === action.cid) index = i;
    })
    // console.log('index', index);

    const u: PalCell = {...p[index]};
    // console.log(u);
    const k = action.data.k as keyof PalCell;
    (u[k] as string | number) = action.data.v;

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
  [SET_MAP_TILE]: (state: AppState, action: { payload: { x: number; y: number; id: number; }; }) => {
    const {x, y, id} = action.payload;
    // console.log(`(${x},${y})->${id}`);
    const newState = [...state.mapData];
    newState[y][x] = id;
    // console.log('!', JSON.stringify(newState));
    return {...state, ...{mapData: newState}};
  },
  'setMap': (state: AppState, action: { mapData: number[][]; }) => {
    // const map = [ ...state.map ];
    const newMap = action.mapData;
    return {...state, ...{mapData: newMap}};
  },
  'setTileUrl': (state: AppState, action: { url: string; }) => {
    const url = `${Path}/tilesets/${action.url}`;
    return { ...state, ...{ tileUrl: url } }
  },
  'setTileDim': (state: AppState, action: { dim: number; }) => ({ ...state, ...{ tileDim: action.dim } }),
  'at': (state: AppState) => state,
  [SAVE_MAP_FILE]: (state: AppState) => {
    const content = prepareData(state);
    console.log('save->', content);
    saveJson(content);
    return state;
  },
  [SAVE_DATA]: (state: AppState) => {
    console.log('SAVE');
    console.log(JSON.stringify(getMapDataFromState(state)));
    return state;
  }
}

