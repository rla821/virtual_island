import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Use HashRouter so routes work on GitHub Pages without server routing */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);