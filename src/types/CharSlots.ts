import {CharSlot} from "./CharSlot";

export type CharSlots = {
  head?: CharSlot;
  neck?: CharSlot;
  shoulders?: CharSlot;
  body?: CharSlot;

  hands?: CharSlot;
  ringRight?: CharSlot;
  ringLeft?: CharSlot;

  mainHand?: CharSlot;
  offHand?: CharSlot;

  girdle?: CharSlot;
  feet?: CharSlot;
}