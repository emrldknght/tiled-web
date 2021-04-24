export type MapFile = {
  tileUrl: string,
  tileDim: number,
  mapData: number[][]
}

export const fetchMapFile = async (): Promise<MapFile> => {
  return new Promise((resolve) => {
    // console.log('fetch data');
    const p = `map1.json`;
    fetch(p)
      .then(r => {
        // console.log(r);
        // if(!r.ok) { throw new Error('not ok')}
        return r.json().catch(err => {
          console.warn(`parsing failed: ${err}`)
          // throw new Error('pf');
          return {}
        });

      })
      .then(j => {
        // console.log('ja', j);
        resolve(j);
      })
    /*
    .catch(err => {
      console.log('catch!', err)
      reject(err)
    })
     */
  })
}