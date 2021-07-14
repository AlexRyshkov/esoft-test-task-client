import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Todo from "./components/Todo";
import PrivateRoute from './components/PrivateRoute';
import App from "./App";

export default function Routes() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={App} />
                <PrivateRoute exact path="/todos" component={Todo} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Router >);
}
