import {WeaponP} from "./Weapon";
import {ArmorP} from "./Armor";

export type ItemType = 'Weapon' | 'Armor'

export type Item = {
  id: number;
  name: string;

  weight: number, // lbs
  cost: number, // gp
  itemType: ItemType,
}

export type ItemP = (WeaponP | ArmorP);