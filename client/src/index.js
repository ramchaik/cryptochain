import React from "react";
import { render } from "react-dom";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import App from "../src/components/App";
import Blocks from "../src/components/Blocks";
import ConductTransaction from '../src/components/ConductTransaction';
import TransactionPool from '../src/components/TransactionPool';
import "./index.css";

render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/blocks' component={Blocks} />
      <Route path='/conduct-transaction' component={ConductTransaction} />
      <Route path='/transaction-pool' component={TransactionPool} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
