import { useMarket } from "../context/MarketContext";

export default function ItemsCalculation() {
  const {
    sortBy,
    dispatch,
    totalItems,
    totalQuantity,
    totalPrice,
    totalAvailability,
  } = useMarket();
  //
  const summedTotalPrice = totalPrice
    .filter((val) => val)
    .reduce((acc, val) => acc + val, 0);
  //
  return (
    <section className="app__items-calculation">
      <h1>Total items: {totalItems || 0}</h1>
      <h1>Total price: {summedTotalPrice || 0}$</h1>
      <h1>Total quantity: {totalQuantity || 0}</h1>
      <h1>Total item availability: {Math.trunc(totalAvailability())}%</h1>
      <div className="app__sorting-fragment">
        <select
          value={sortBy}
          onChange={(e) =>
            dispatch({ type: "sortChange", payload: e.target.value })
          }
        >
          <option value="sort">Sort By</option>
          <option value="price">Price (per single item)</option>
          <option value="quantity">Quantity</option>
        </select>
        <button
          className="sorting-btn"
          onClick={() => dispatch({ type: "sortedItems" })}
        >
          Sort
        </button>
      </div>
      <button
        className="delete-all-btn"
        onClick={() => dispatch({ type: "deleteAll" })}
      >
        Delete All
      </button>
    </section>
  );
}
