// ────────────────────────────────────────────────
// main.jsx — Root Entry File
// Pehchaan Media Portfolio — Updated with UI styles
// ────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Base Tailwind & global styles
import "./styles/ui.css"; // 🔥 Custom Button + Filters + Glass styling

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
