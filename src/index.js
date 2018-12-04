import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "@fortawesome/fontawesome-free/css/all.css";
import "bulma/css/bulma.css";
// import "./css/@fortawesome/fontawesome-free/css/all.css";
// import "./css/bulma/css/bulma.css";

console.log(process.env);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
