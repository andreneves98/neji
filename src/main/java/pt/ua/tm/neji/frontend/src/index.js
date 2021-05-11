import React from "react";
import ReactDOM from "react-dom";
import App from "./layouts/App";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/app" render={(props) => <App {...props} /> } />
            <Redirect from="/" to="/app/annotation" />
        </Switch>
    </BrowserRouter>, 
    document.getElementById("root")
);