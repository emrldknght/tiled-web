export const Path = 'http://localhost/sq';
export const Files = `${Path}/list-files`;

export const fetchPath = (path) => {
  return new Promise(resolve => {
    fetch(path)
      .then(r => r.json())
      .then(j => resolve(j));
  })
}