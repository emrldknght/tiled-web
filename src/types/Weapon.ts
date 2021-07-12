import {Item} from "./Item";

export enum WeaponType {
  Bludgeoning = 'bludgeoning',
  Piercing = 'piercing',
  Slashing = 'slashing',
}

// type WType = Record<WeaponType, string>; // 'Bludgeoning' | 'Piercing' | 'Slashing';

export enum WeaponCategory {
  Unarmed = 'unarmed',
  Light = 'light' ,
  OneHanded = 'one-handed' ,
  TwoHanded = 'two-handed'
}

// type WCategory = Record<WeaponCategory, string>; //'Unarmed' | 'Light' | 'One-Handed' | 'Two-Handed';

export enum WeaponProfiency {
  Simple = 'simple',
  Martial = 'martial',
  Exotic = 'exotic'
}

// type WProfiency = Record<WeaponProfiency, string>; // 'Simple' | 'Martial' | 'Exotic';


type WGroup = 'Close'
  | 'Hammers' | 'Flails' | 'Spears' | 'Polearms'
  | 'Axes' | 'Light Blades' | 'Thrown' | 'Monk' | 'Double'
  | 'Tribal' ;

// Melee | Ranged + reach / double / thrown / projectile / ammunition

// range increment
type WSpecial =
  'Non Lethal' |
  'Fragile' |
  'Monk' | 'Double' |
  'Attached' |
  'Disarm' | 'Grapple' |
  'Trip' | 'Brace' | 'Reach' ;

// export type Weapon = Item & {
export interface Weapon extends Item {
  // id: number;
  // name: string;

  damage: string;
  crit_min: number;
  crit_max: number;
  crit_mult: number;
  type: string;
  category: string;
  proficiency: string;

  // weight: number;
  // cost: number;
  itemType: 'Weapon';
}

export type WeaponP = Pick<Weapon, 'id' | 'name' | 'itemType'>