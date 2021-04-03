import {classMapper} from "./classMapper";

export const getCellType = (data) => {
  return classMapper[data] ?? '';
  /*
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
  */
}