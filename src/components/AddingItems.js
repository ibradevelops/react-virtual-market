import { useMarket } from "../context/MarketContext";

export default function AddingItems() {
  const { state, dispatch } = useMarket();
  const {
    nameQuery,
    priceQuery,
    quantityQuery,
    availability,
    items,
    errorMsg,
  } = state;
  //
  function clean() {
    dispatch({ type: "clean" });
  }
  //
  function handleAddItem() {
    if (
      !nameQuery ||
      !priceQuery ||
      !quantityQuery ||
      availability === "select"
    ) {
      dispatch({ type: "errorMsg" });
      return;
    }
    if (items.map((item) => item.name).includes(nameQuery)) {
      alert(`You already have ${nameQuery} in your list`);
      return;
    }
    //
    const firstLetter = nameQuery.slice(0, 1).toUpperCase();
    const rest = nameQuery.slice(1).toLowerCase();
    //
    const item = {
      name: firstLetter + rest,
      quantity: quantityQuery,
      price: priceQuery,
      availability,
    };
    dispatch({ type: "addingItem", payload: item });
    clean();
  }
  //
  return (
    <section className="app__adding-items-section">
      <div className="app__adding-items">
        <input
          type="text"
          placeholder="Type name here..."
          value={nameQuery}
          onChange={(e) =>
            e.target.value.length <= 17 &&
            dispatch({ type: "nameChange", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Type price here..."
          value={priceQuery || ""}
          onChange={(e) =>
            e.target.value.length <= 6 &&
            dispatch({
              type: "priceChange",
              payload: Number(e.target.value),
            })
          }
        />
        <input
          type="text"
          placeholder="Type quantity here..."
          value={quantityQuery || ""}
          onChange={(e) =>
            e.target.value.length <= 3 &&
            dispatch({
              type: "quantityChange",
              payload: Number(e.target.value),
            })
          }
        />
        <select
          onChange={(e) =>
            dispatch({
              type: "availabilityChange",
              payload: e.target.value,
            })
          }
        >
          <option value="select">Select Availability</option>
          <option value={1}>Available</option>
          <option value={0}>Not Available</option>
        </select>

        <button className="adding__items-btn" onClick={handleAddItem}>
          Add
        </button>
      </div>
      <p className={`app__adding-msg ${errorMsg && "err_msg"}`}>
        {errorMsg || `You are going to add ${nameQuery || "..."}`}
      </p>
    </section>
  );
}
