import {MapData} from "../types";
import {PanelMode} from "../components/map/MapDimensions";

const newArray = (n: number): undefined[] => [...Array(n)];

/**
 * return array [1, 2, ..., n]
 */
export const newOrderedArray = (n: number): number[] => [...Array(n).keys()];

const newRow = (l: number): Array<-1> => newArray(l).map(() => -1);

export const repeatF = (action: Function, times: number) => {
  const na = newArray(times);
  na.forEach(() => action());
}
export const combineF = <T>(data: T, ...actions: Function[]): Function => {
  return () => {
    actions.forEach((action: Function) => {
      console.log(action);
      action(data)
    });
  }
}

const addTopRow = (data: MapData) => {
  const l = data[0].length;
  const nr = newRow(l);
  // console.log(newRow);
  return data.unshift(nr);
}
const deleteTopRow = (data: MapData): void => {
  data.shift();
}
const addBotRow = (data: MapData): void => {
  const l = data[0].length;
  const nr = newRow(l);
  // console.log(newRow);
  data.push(nr);
}
const deleteBotRow = (data: MapData): void => {
  data.pop();
}

const addLeftCol = (data: MapData): void => {
  data.forEach(row => row.unshift(-1));
}
const deleteLeftCol = (data: MapData): void => {
  data.forEach(row => row.shift());
}
const addRightCol = (data: MapData): void => {
  data.forEach(row => row.push(-1));
}
const deleteRightCol = (data: MapData) => {
  data.forEach(row => row.pop());
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
      return () => {}
  }
}