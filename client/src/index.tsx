import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";

// renders React Component "Root" into the DOM element with ID "root"
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// allows for live updating
if (module.hot !== undefined) {
  module.hot.accept();
}
