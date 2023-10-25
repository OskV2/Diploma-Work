import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('The "root" element was not found in the HTML.');
}