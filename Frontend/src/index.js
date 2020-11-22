import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

ReactDOM.render(
  <div>
    <App />
    <Loader promiseTracker={usePromiseTracker} />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
