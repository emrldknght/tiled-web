const styleToString = (style) => {
  return Object.keys(style).reduce((acc, key) => (
    acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
  ), '');
};

const defaultStyles = {
  '.App': {
    backgroundColor: 'purple',
  }
}

export const generateCellStyles = (styles = defaultStyles) => {
  const output = Object.keys(styles).reduce((acc, item) => (
    acc + `${item}{${styleToString(styles[item])}}`
  ), '');

  console.log(output);

  return output;
  // return `.App{background-color:purple;}`;
}

export const palWrapper = (pal) => {
  const styles = {};
  pal.forEach(cell => {
    styles[`.${cell.type}`] = {
      '--bg-color': cell.bg || '',
      '--ox': (-cell.x) || 0,
      '--oy': (-cell.y) || 0
    }
  })
  return styles;
};

export const gs = pal => generateCellStyles(palWrapper(pal));

// generateCellStyles();