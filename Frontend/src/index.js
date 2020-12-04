import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <Loader promiseTracker={usePromiseTracker} />
    </div>
    ,
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
