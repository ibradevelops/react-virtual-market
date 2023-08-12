import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { MarketProvider } from "./context/MarketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MarketProvider>
      <App />
    </MarketProvider>
  </React.StrictMode>
);
