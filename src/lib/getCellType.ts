// import {classMapper} from "./classMapper";
/*
export const getCellType = (data) => {
  // return classMapper[data] ?? '';

  switch (data) {
    case 0:
      return 'grass';
      break;
    case 1:
      return 'water';
      break;
    default:
      return '';
  }

}
 */
import {PalCell} from "../types";

export const getCT = (types: PalCell[], id: number) => {
  const f = types.filter(item => item.id === id) ;
  const e = f[0] ?? { type: 'error' }
  return e.type;
}