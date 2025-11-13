const originalFetch = window.fetch;      // save original fetch
const API_BASE = import.meta.env.VITE_API_URL; // get base URL from env

window.fetch = (input, init) => {
  if (typeof input === "string" && input.startsWith("/api")) {
    input = API_BASE + input;  // prepend base URL automatically
  }
  return originalFetch(input, init);
};


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Logon from './components/Logon.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
