import Header from "./components/Header";
import AddingItems from "./components/AddingItems";
import ItemsList from "./components/ItemsList";
import ItemsCalculation from "./components/ItemsCalculation";
import { useMarket } from "./context/MarketContext";
//
export default function App() {
  return (
    <div className={`app ${useMarket().toggle ? "dark-mode" : ""}`}>
      <Header />
      <main className="app__main">
        <AddingItems />
        <ItemsList />
        <ItemsCalculation />
      </main>
    </div>
  );
}
