import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Application from "./Application";

// link from backend to frontend
import Amplify from "aws-amplify";
import configuration from "./aws-exports";

Amplify.configure(configuration);

ReactDOM.render(<Application />, document.getElementById("root"));
