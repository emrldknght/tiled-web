import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'
import {reducer} from "./store/reducer";

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

