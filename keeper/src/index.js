

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(<Router basename={/github.io/.test(window.location) ? "/Web-Projects/keeper" : ""}>
<App />
</Router>, document.getElementById("root"));
