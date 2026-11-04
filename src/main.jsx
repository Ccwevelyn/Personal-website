import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { logConsoleLetter } from "./consoleLetter";
import "./styles/tokens.css";
import "./styles/home.css";

logConsoleLetter();

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
