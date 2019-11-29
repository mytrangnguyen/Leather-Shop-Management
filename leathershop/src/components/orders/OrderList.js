import React from "react";
import { Link } from "react-router-dom";

import OrderListItem from "./OrderListItem";

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      ordersPerPage: 8
    };
  }

  handleClick = number => {
    if (number > 0) {
      this.setState({ currentPage: number });
    }
  };

  render() {
    const {
      orders,
      listProducts,
      customers,
      deleteItem,
      undoDelete
    } = this.props;
    const { currentPage, ordersPerPage } = this.state;
    let orders2 = orders.filter(item => !item.deleteAt);

    // Logic for displaying orders
    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;
    let orderList = "";

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orders2.length / ordersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          onClick={() => this.handleClick(number)}
          className="page-item"
          id={number}
        >
          <Link className="page-link" to="/orders">
            {number}
          </Link>
        </li>
      );
    });

    if (orders2.length > 0) {
      const currentOrders = orders2.slice(indexOfFirst, indexOfLast);
      let count = indexOfFirst;
      orderList = currentOrders.map(item => {
        count++;
        return (
          <OrderListItem
            item={item}
            listProducts={listProducts}
            customers={customers}
            index={count}
            deleteItem={deleteItem}
            undoDelete={undoDelete}
            key={item.id}
          />
        );
      });
    }
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">LIST OF ORDER</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>NAME CUSTOMER</th>
                  <th>ORDER DATE</th>
                  <th>PRODUCTS</th>
                  <th>AMOUNT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              {orderList.length > 0 && <tbody>{orderList}</tbody>}
            </table>
            <ul className="pagination">
              <li
                onClick={() => this.handleClick(currentPage - 1)}
                className="page-item"
              >
                <Link className="page-link" to="/orders">
                  <i className="fa fa-backward" />
                </Link>
              </li>
              {renderPageNumbers}
              <li
                onClick={() => this.handleClick(currentPage + 1)}
                className="page-item"
              >
                <Link className="page-link" to="/orders">
                  <i className="fa fa-forward" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
