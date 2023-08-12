import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const MarketContext = createContext();

function MarketProvider({ children }) {
  const initialState = {
    /*
    if there are items in the local storage, it will take them as 
    initial array, otherwise, it will take an empty array
    */
    items: JSON.parse(localStorage.getItem("reactVirtualMarket")) || [],
    nameQuery: "",
    priceQuery: "",
    quantityQuery: "",
    availability: "select",
    sortBy: "",
    errorMsg: "",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "nameChange": {
        return { ...state, errorMsg: "", nameQuery: action.payload };
      }
      case "priceChange": {
        return { ...state, errorMsg: "", priceQuery: action.payload };
      }
      case "quantityChange": {
        return { ...state, errorMsg: "", quantityQuery: action.payload };
      }
      case "availabilityChange": {
        return {
          ...state,
          errorMsg: "",
          availability:
            (action.payload === "select" && "select") ||
            (Number(action.payload) === 1 ? true : false),
        };
      }
      case "sortChange": {
        return { ...state, sortBy: action.payload };
      }
      case "sortedItems": {
        try {
          if (state.sortBy === "" || state.sortBy === "sort") return state;
          if (state.sortBy === "price") {
            return {
              ...state,
              items: state.items.sort((a, b) => b.price - a.price),
            };
          }
          if (state.sortBy === "quantity") {
            return {
              ...state,
              items: state.items.sort((a, b) => b.quantity - a.quantity),
            };
          }
        } catch (e) {
        } finally {
          return { ...state, errorMsg: "" };
        }
      }
      case "addingItem": {
        const item = action.payload;
        return {
          ...state,
          items: [...state.items, item],
        };
      }
      case "deletingItem": {
        const filteredItems = state.items.filter(
          (item) => item.name !== action.payload
        );
        return { ...state, errorMsg: "", items: filteredItems };
      }
      case "clean": {
        return {
          ...state,
          nameQuery: "",
          priceQuery: "",
          quantityQuery: "",
          errorMsg: "",
        };
      }
      case "incQuantity": {
        const items = state.items.map((item) =>
          item.name === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
        return { ...state, errorMsg: "", items };
      }
      case "decQuantity": {
        const items = state.items.map((item) =>
          item.name === action.payload
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        );
        return { ...state, errorMsg: "", items };
      }
      case "toggleAvailability": {
        const items = state.items.map((item) =>
          item.name === action.payload
            ? {
                ...item,
                availability: !item.availability,
              }
            : item
        );

        return { ...state, errorMsg: "", items };
      }
      case "errorMsg": {
        return { ...state, errorMsg: "Please fill out all input fields!" };
      }
      case "deleteAll": {
        return { ...state, errorMsg: "", items: [] };
      }
      case "localStorageItems": {
        console.log(action.payload);
        return { ...state, items: action.payload };
      }
      default: {
        throw new Error("Unknown action");
      }
    }
  }
  // Toggling Dark Mode
  const [toggle, setToggle] = useState(false);
  // App Logic in reducer function
  const [state, dispatch] = useReducer(reducer, initialState);

  const { items, sortBy } = state;

  // saving items in local storage
  useEffect(() => {
    localStorage.setItem("reactVirtualMarket", JSON.stringify(items));
  }, [items]);
  //
  const totalItems = items?.length;
  //
  const totalQuantity = items
    .map((item) => item?.quantity)
    .reduce((acc, val) => acc + val, 0);
  //
  const quantities = items.map((item) => item?.quantity);
  const prices = items.map((item) => item?.price);
  //
  let totalPrice = [];
  for (let i = 0; i < [...quantities, ...prices].length; i++) {
    if (quantities.length && prices.length) {
      totalPrice.push(quantities[i] * prices[i]);
    } else {
      return;
    }
  }
  //
  const totalAvailability = function () {
    const availableItems = items?.filter((item) => item.availability).length;
    if (availableItems) {
      return (availableItems / totalItems) * 100;
    } else {
      return 0;
    }
  };
  //
  return (
    <MarketContext.Provider
      value={{
        toggle,
        setToggle,
        state,
        items,
        dispatch,
        sortBy,
        totalItems,
        totalQuantity,
        totalPrice,
        totalAvailability,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("MarketContext was used outside the MarketProvider");
  }
  return context;
}

export { MarketProvider, useMarket };
