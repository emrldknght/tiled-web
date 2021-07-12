import {WItem} from "../WeaponsComponent";

export const getAllKeys = (data: WItem[], key: keyof WItem) => {
  let keys: (string | null)[] = [];

  data.forEach(item => {
    const ik = item[key] as keyof WItem;
    // console.log(ik)
    if(keys.indexOf(ik) === -1) keys.push(ik);
  })

  keys = keys.sort();
  keys.unshift(null);

  // console.log('gak', keys);
  return keys;
}