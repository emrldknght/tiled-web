import {ApiAnswer, ApiError, ApiOk, MapFile} from "../types";
import {Character} from "../types/Character";
import {Weapon} from "../types/Weapon";
import {ItemP} from "../types/Item";
import {Armor} from "../types/Armor";

export const Path = 'http://oyba.xenn.xyz/server';
export const Files = `${Path}/list-files`;

export const fetchPath = (path: string): Promise<never> => {
  return new Promise(resolve => {
    fetch(path, {

    })
      .then(r => r.json())
      .then(j => resolve(j));
  })
}

// type PostDataType<T> = (path: string, data: T) => Promise<T>;

export const postData = (path: string, data: any): Promise<ApiAnswer> => {
  // console.log(path, data);
  // return axios.post(path, data);
  return  new Promise(resolve => {
    fetch(path, {
      method: 'POST',
      mode: 'cors',
      headers: {
        // 'Content-Type': 'text/plain',
      },
      body: JSON.stringify(data),
    })
      .then(r => {
        // console.log(r);
        return r.json()
      })
      .then(j => resolve(j))
  })
}

export const fetchFileList = (): Promise<string[] | ApiError> =>
  fetchPath(Files);

export const fetchMap = (mapId: string): Promise<MapFile | ApiError> =>
  fetchPath(`${Path}/map-file/${mapId}`) as Promise<MapFile | ApiError>;
export const fetchChar = (id: number): Promise<Character | ApiError> =>
  fetchPath(`${Path}/char/${id}`);

export const fetchItems = (): Promise<ItemP[] | ApiError> =>
  fetchPath(`${Path}/items`);

export const fetchWeapon = (id: number): Promise<Weapon | ApiError> =>
  fetchPath(`${Path}/weapon/${id}`);

export const fetchArmor = (id: number): Promise<Armor | ApiError> =>
  fetchPath(`${Path}/armor/${id}`);

export const addEmptyItem = (type: string): Promise<ApiOk | ApiError> =>
  fetchPath(`${Path}/item-add/${type}`);

export const addNewWeapon = () => addEmptyItem('weapon');
export const addNewArmor = () => addEmptyItem('armor');
