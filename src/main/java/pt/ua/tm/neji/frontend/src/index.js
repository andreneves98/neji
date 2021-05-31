import React from "react";
import ReactDOM from "react-dom";
import App from "./layouts/App";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Project from "./views/Project";
import SA_AnnotationPage from "./views/SA_AnnotationPage";


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/app" render={(props) => <App {...props} />} />
            <Route exact path="/app/projects" component={App} />
            <Route path="/app/projects/:name" component={Project} />
            <Redirect exact from="/" to="/app/projects" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);