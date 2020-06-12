import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as serviceWorker from './serviceWorker';
import './index.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Search from "./Search";
import Account from "./Account";
import Login from './Login';
import Register from './Register';
import Top from './Top';
import Catalog from './Catalog';


const routing = (
  <Router>
    <Switch>
      <Route path="/films" component={Search} />

      <Route path="/account" component={Account} />

      <Route path="/login" component={Login} />

      <Route path="/register" component={Register} />

      <Route path="/top" component={Top} />

      <Route path="/catalog" component={Catalog} />

      <Route path="/" component={Home} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
