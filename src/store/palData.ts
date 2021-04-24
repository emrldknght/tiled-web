export type PalCell = {
  id: number,
  type: string,
  cid: string,
  x: number,
  y: number,
  bg: string
}

export const palData: PalCell[] = [
  {
    id: -1,
    type: 'empty',
    cid: 'xEyE',
    x: -1,
    y: -1,
    bg: 'none'
  },
  {
    id: 0,
    type: 'grass',
    x: 1,
    y: 0,
    bg: 'green',
    cid: 'x1y0'
  },
  {
    id: 1,
    type: 'road',
    x: 1,
    y: 3,
    bg: 'brown',
    cid: 'x1y3'
  },
  {
    id: 2,
    type: 'random',
    x: 2,
    y: 4,
    bg: 'red',
    cid: 'x2y4'
  },
]

