import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import history from "../history";
import Transaction from "./Transaction";

const POOL_INTERVEL_MS = 10000;

export default class TransactionPool extends Component {
  state = {
    transactionPoolMap: {},
  };

  fetchTransactionPoolMap = () => {
    fetch(`${document.location.origin}/api/transaction-pool-map`)
      .then((response) => response.json())
      .then((json) => this.setState({ transactionPoolMap: json }));
  };

  fetchMineTransactions = () => {
    fetch(`${document.location.origin}/api/mine-transactions`).then(
      (response) => {
        if (response.status === 200) {
          alert("Success");
          history.push("/blocks");
        } else {
          alert("The mine-transactions block request did not complete.");
        }
      }
    );
  };

  componentDidMount() {
    this.fetchTransactionPoolMap();

    this.fetchPoolMapInterval = setInterval(
      () => this.fetchTransactionPoolMap(),
      POOL_INTERVEL_MS
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchPoolMapInterval);
  }

  render() {
    const { transactionPoolMap } = this.state;

    return (
      <div className='TransactionPool'>
        <div>
          <Link to='/'>Home</Link>
        </div>
        <h3>Transaction Pool</h3>
        {Object.values(transactionPoolMap).map((transaction) => (
          <div key={transaction.id}>
            <hr />
            <Transaction transaction={transaction} />
          </div>
        ))}
        <hr />
        <Button bsStyle='danger' onClick={this.fetchMineTransactions}>
          Mine a Transaction
        </Button>
      </div>
    );
  }
}
