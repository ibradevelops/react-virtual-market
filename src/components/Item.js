import { useMarket } from "../context/MarketContext";

export default function Item({ item, count }) {
  const { dispatch } = useMarket();
  function availabilityStyle(parametar) {
    return !item.availability ? parametar : "";
  }
  return (
    <li
      className={`items__single-list ${availabilityStyle("item-done-opacity")}`}
    >
      <div>
        <p className="items__single-list--order">{count})</p>
        <p
          className={`items__single-list--name ${availabilityStyle(
            "item-done-line"
          )}`}
        >
          {item.name}
        </p>
      </div>
      <div>
        <p className="items__single-list--price">
          <span>{item.price}$ per item</span> Total:{" "}
          {item.price * item.quantity}$
        </p>
      </div>
      <div>
        <button
          disabled={!item.availability}
          className="item-btn items__single-list--btn-dec"
          onClick={() => dispatch({ type: "decQuantity", payload: item.name })}
        >
          -
        </button>
        <span>
          <p className="items__single-list--quantity">{item.quantity}</p>
          <p>{item.quantity < 2 ? "piece" : "pieces"}</p>
        </span>

        <button
          disabled={!item.availability}
          className="item-btn items__single-list--btn-inc"
          onClick={() => dispatch({ type: "incQuantity", payload: item.name })}
        >
          +
        </button>
      </div>
      <div>
        <button
          className="item-btn items__single-list--btn-avab"
          onClick={() =>
            dispatch({ type: "toggleAvailability", payload: item.name })
          }
        >
          {item.availability ? "Available?" : "Unavailable?"}
        </button>
        <button
          className="item-btn items__single-list--btn-del"
          onClick={() => dispatch({ type: "deletingItem", payload: item.name })}
        >
          Sold out
        </button>
      </div>
    </li>
  );
}
