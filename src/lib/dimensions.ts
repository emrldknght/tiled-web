import {MapLayer} from "../types";
import {PanelMode} from "../components/map/MapDimensions";

const EMPTY = 0;

const newArray = (n: number): undefined[] => [...Array(n)];

/**
 * return array [1, 2, ..., n]
 */
export const newOrderedArray = (n: number): number[] => [...Array(n).keys()];

const newRow = (l: number): Array<typeof EMPTY> => newArray(l).map(() => EMPTY);

export const repeatF = (action: Function, times: number) => {
  const na = newArray(times);
  na.forEach(() => action());
}
export const combineF = <T>(data: T, ...actions: Function[]): Function => {
  return () => {
    let _data = data;
    actions.forEach((action: Function) => {
      _data = action(_data)
    });
    return _data;
  }
}

const addTopRow = (data: MapLayer) : MapLayer => {
  const l = data[0].length;
  const nr = newRow(l);
  data.unshift(nr);
  return data;
}
const deleteTopRow = (data: MapLayer): MapLayer => {
  data.shift();
  return data;
}
const addBotRow = (data: MapLayer): MapLayer => {
  const l = data[0].length;
  const nr = newRow(l);
  data.push(nr);
  return data;
}
const deleteBotRow = (data: MapLayer): MapLayer => {
  data.pop();
  return data;
}

const addLeftCol = (data: MapLayer): MapLayer => {
  data.forEach(row => row.unshift(EMPTY));
  return data;
}
const deleteLeftCol = (data: MapLayer): MapLayer => {
  data.forEach(row => row.shift());
  return data;
}
const addRightCol = (data: MapLayer): MapLayer => {
  data.forEach(row => row.push(EMPTY));
  return data;
}
const deleteRightCol = (data: MapLayer): MapLayer => {
  data.forEach(row => row.pop());
  return data;
}

export type DimActions = {
  [key in 'add' | 'del']: {
    row: RowDirections,
    col: ColDirections
  };
};

export type RowActions = { 'row': RowDirections }
export type RowDirections = { 'top': Function, 'bottom': Function }

export type ColActions = { 'col': ColDirections }
export type ColDirections = { 'left': Function, 'right': Function }

export const modify: DimActions = {
  add: {
    row: {
      top: addTopRow,
      bottom: addBotRow
    },
    col: {
      left: addLeftCol,
      right: addRightCol
    }
  },
  del: {
    row: {
      top: deleteTopRow,
      bottom: deleteBotRow
    },
    col: {
      left: deleteLeftCol,
      right: deleteRightCol
    }
  }
}

export const getAction = (dimActive: number, mode: PanelMode): Function => {
  const a = (mode === 'expand') ? 'add' : 'del';
  const actions: RowActions | ColActions = modify[a];

  const r = (actions as RowActions)['row'];
  const c = (actions as ColActions)['col'];
  switch (dimActive) {
    case 0:
      return <T>(data: T) => combineF(data, r['top'], c['left'])();
    case 1:
      return r['top'];
    case 2:
      return <T>(data: T) => combineF(data, r['top'], c['right'])();
    case 5:
      return c['right'];
    case 3:
      return c['left'];
    case 6:
      return <T>(data: T) => combineF(data, r['bottom'], c['left'])();
    case 7:
      return r['bottom'];
    case 8:
      return <T>(data: T) => combineF(data, r['bottom'], c['right'])();
    default:
      return <T>(data: T) => data;
  }
}