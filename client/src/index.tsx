import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

const CLIENT_ID: string =
  "554056077262-1ullvdd6vrffaaqgle8rlshcc3a6vnqh.apps.googleusercontent.com";

// renders React Component "Root" into the DOM element with ID "root"
const root = createRoot(document.getElementById("root")!);
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);

// allows for live updating
if (module.hot !== undefined) {
  module.hot.accept();
}
