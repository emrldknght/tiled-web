import {CSSProperties} from "react";
import {PalCell} from "../types";

const styleToString = (style: Style) => {
  return Object.keys(style).reduce((acc, key) => (
    acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key as keyof Style] + ';'
  ), '');
};

const defaultStyles: Styles = {
  '.App': {
    backgroundColor: 'purple',
  }
}

export const generateCellStyles = (styles = defaultStyles) => {
  // console.log(output);

  return Object.keys(styles).reduce((acc, item) => (
    acc + `${item}{${styleToString(styles[item])}}`
  ), '');
  // return `.App{background-color:purple;}`;
}

type Style = CSSProperties & { '--bg-color'?: string, '--ox'?: number, '--oy'?: number }
type Styles = { [key: string]: Style }

export const palWrapper = (pal: PalCell[]) => {
  const styles: Styles = {};
  pal.forEach(cell => {
    styles[`.${cell.type}`] = {
      '--bg-color': cell.bg || '',
      '--ox': (-cell.x) || 0,
      '--oy': (-cell.y) || 0
    }
  })
  return styles;
};

export const gs = (pal: PalCell[]) => generateCellStyles(palWrapper(pal));

// generateCellStyles();