import {ApiAnswer, ApiError, ApiOk, MapFile, PalCell} from "../types";
import {Character} from "../types/Character";
import {Weapon} from "../types/Weapon";
import {ItemP} from "../types/Item";
import {Armor} from "../types/Armor";

export const Path = process.env.REACT_APP_API; //'http://localhost/sq'; || 'http://oyba.xenn/server'
export const Files = `${Path}/list-files`;

export const fetchPath = (path: string): Promise<never> => {
  return new Promise(resolve => {
    fetch(path, {

    })
      .then(r => r.json())
      .then(j => resolve(j));
  })
}



export const postData = <T>(path: string, data: T): Promise<ApiAnswer<T>> => {

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

        return r.json()
      })
      .then(j => resolve(j))
  })
}

export const FetchPalette = (name: string): Promise<ApiAnswer<PalCell[]>> => fetchPath(`${Path}/palette/${name}`);

export const fetchFileList = (): Promise<ApiAnswer<string[]>> =>
  fetchPath(Files);

export const fetchMap = (mapId: string): Promise<ApiAnswer<MapFile>> =>
  fetchPath(`${Path}/map-file/${mapId}`) as Promise<MapFile | ApiError>;

export const fetchChar = (id: number): Promise<ApiAnswer<Character>> =>
  fetchPath(`${Path}/char/${id}`);

export const fetchItems = (): Promise<ApiAnswer<ItemP[]>> =>
  fetchPath(`${Path}/items`);

export const fetchWeapon = (id: number): Promise<ApiAnswer<Weapon>> =>
  fetchPath(`${Path}/weapon/${id}`);

export const fetchArmor = (id: number): Promise<ApiAnswer<Armor>> =>
  fetchPath(`${Path}/armor/${id}`);

export const addEmptyItem = (type: string): Promise<ApiAnswer<ApiOk>> =>
  fetchPath(`${Path}/item-add/${type}`);

export const addNewWeapon = () => addEmptyItem('weapon');
export const addNewArmor = () => addEmptyItem('armor');
