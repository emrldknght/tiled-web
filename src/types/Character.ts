import {CharStats} from "./CharStats";
import {CharSlots} from "./CharSlots";

export type Character = {
  ID: number,
  Name: string,
  Stats: CharStats;
  Slots: CharSlots;
  /*
  Dexterity: number,
  Constitution: number,
  Intelligence: number,
  Wisdom: number,
  Charisma: number,
   */
}