export const Path = (process.env.NODE_ENV !== 'production') ? 'http://localhost/sq' : '/server';
export const Files = `${Path}/list-files`;

export const fetchPath = (path: string): Promise<string[]> => {
  return new Promise(resolve => {
    fetch(path)
      .then(r => r.json())
      .then(j => resolve(j));
  })
}