export const fetchMapFile = async () => {
  return new Promise((resolve) => {
    // console.log('fetch data')
    fetch('map1.json')
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