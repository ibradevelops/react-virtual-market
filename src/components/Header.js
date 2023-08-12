import { useMarket } from "../context/MarketContext";

export default function Header() {
  const { toggle, setToggle } = useMarket();
  return (
    <header className="app__header">
      <div className="app__sub-header">
        <button
          className="toggle__btn"
          onClick={() => setToggle((mode) => !mode)}
        >
          {toggle ? "Toggle Light Mode 🌞" : "Toggle Dark Mode 🌘"}
        </button>
        <h1 className="app__title">Virtual Market </h1>
        <p className="app__date">{new Date().toDateString()}</p>
      </div>
      <div className="app__sub-title-header">
        <h2 className="app__sub-title">
          Embrace the digital era: enter our intuitive virtual market!
        </h2>
      </div>
    </header>
  );
}
