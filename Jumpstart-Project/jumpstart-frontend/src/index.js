import React from "react";
import ReactDOM from "react-dom";

import "./assets/css/styles.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import App from "./App";
import * as ServiceWorker from "./ServiceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

ServiceWorker.unregister();
