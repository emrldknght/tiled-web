import {ItemP, ItemType} from "../../types/Item";

export type ItemListElProps = {
  item: ItemP,
  selectItem: (id: number, type: ItemType) => void,
  selectedItem: number | null
};
export function ItemListEl({item, selectItem, selectedItem}: ItemListElProps) {
  return (
    <li onClick={() => selectItem(item.id, item.itemType)} className={(item.id === selectedItem) ? 'selected' : ''}>
      <span>{item.id}</span>
      <span>|</span>
      <span>&nbsp;{item.name}</span>
    </li>
  )
}