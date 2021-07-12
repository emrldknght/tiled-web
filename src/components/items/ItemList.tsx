import {ItemP, ItemType} from "../../types/Item";
import {ItemListEl} from "./ItemListEl";

export type ItemListProps = {
  items: ItemP[],
  selectItem: (id: number, type: ItemType) => void,
  selectedItem: number | null
};
export function ItemList({items, selectItem, selectedItem }: ItemListProps) {
  const key = (item: ItemP) => `${item.itemType}:${item.id}`;
  const itemList = items.map(item => <ItemListEl
      item={item} selectItem={selectItem} selectedItem={selectedItem}
      key={key(item)} />
    /*
      <li onClick={() => selectItem(item.id)} key={key(item)}
          className={(item.id === selectedItem) ? 'selected' : ''}>
        <span>{item.id}</span>
        <span>|</span>
        <span>&nbsp;{item.name}</span>
      </li>
    */
  )
  return (
    <ul className="items-list">
      {itemList}
    </ul>
  )
}