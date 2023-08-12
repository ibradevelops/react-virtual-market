import { useMarket } from "../context/MarketContext.js";
import Item from "./Item.js";

export default function ItemsList() {
  const { items } = useMarket();
  return (
    <ul className="app__items-list">
      {!items.length && (
        <h1 className="no__items-msg">Your items will appear here. 📌</h1>
      )}
      {items.map((item, i) => (
        <Item key={i} item={item} count={i + 1} />
      ))}
    </ul>
  );
}
