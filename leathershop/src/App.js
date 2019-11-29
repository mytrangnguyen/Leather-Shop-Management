import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./pages/home";
import Users from "./pages/user";
import Customers from "./pages/customer";
import Employees from "./pages/employee";
import Categories from "./pages/category";
import Products from "./pages/product";
import Orders from "./pages/order";
import LeftMenu from "./components/layouts/LeftMenu";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Login from "./pages/login";
import NotFound from "./pages/notfound";
import { withFirebase } from "./components/Firebase";
import IsLoading from "./components/layouts/IsLoading";

import "./App.css";

class AppBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      customers: [],
      employees: [],
      categories: [],
      products: [],
      orders: [],
      user: null
    };
  }

  getTableCall = table => {
    switch (table) {
      case "users": {
        return this.props.firebase.users();
      }
      case "customers": {
        return this.props.firebase.customers();
      }
      case "employees": {
        return this.props.firebase.employees();
      }
      case "categories": {
        return this.props.firebase.categories();
      }
      case "products": {
        return this.props.firebase.products();
      }
      case "orders": {
        return this.props.firebase.orders();
      }
      default: {
        return "";
      }
    }
  };

  getTableCallUpdate = (table, id) => {
    switch (table) {
      case "users": {
        return this.props.firebase.updateUsers(id);
      }
      case "customers": {
        return this.props.firebase.updateCustomers(id);
      }
      case "employees": {
        return this.props.firebase.updateEmployees(id);
      }
      case "categories": {
        return this.props.firebase.updateCategories(id);
      }
      case "products": {
        return this.props.firebase.updateProducts(id);
      }
      case "orders": {
        return this.props.firebase.updateOrders(id);
      }
      default: {
        return "ly";
      }
    }
  };

  getData = table => {
    let tableCall = this.getTableCall(table);
    this.setState({
      isLoaded: false
    });
    tableCall
      .orderByChild("createAt")
      .on("value", snapshot => {
        const object = snapshot.val();
        if (object) {
          const objectList = Object.keys(object).map(key => ({
            ...object[key],
            id: key
          }));
          this.setState({
            [table]: objectList.reverse(),
            isLoaded: true
          });
        } else {
          this.setState({
            [table]: []
          });
        }
      });
  };

  addNew = (table, rowNew) => {
    let tableCall = this.getTableCall(table);
    let createAt = this.props.firebase.db.INTERNAL.database.repo_.app.firebase_
      .database.ServerValue.TIMESTAMP;
    let key = tableCall.push({ ...rowNew, createAt }).getKey();
    this.getData(table);
    return key;
  };

  update = (table, rowUpdate) => {
    const { id, ...rowUpdateSnapshot } = rowUpdate;
    let tableCall = this.getTableCallUpdate(table, id);
    tableCall.set(rowUpdateSnapshot);
  };

  deleteItem = (table, rowUpdate) => {
    const { id, ...rowUpdateSnapshot } = rowUpdate;
    let date = new Date();
    let deleteDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let tableCall = this.getTableCallUpdate(table, id);
    tableCall.set({ ...rowUpdateSnapshot, deleteAt: deleteDate });
  };

  undoDelete = (table, rowUpdate) => {
    const { id, ...rowUpdateSnapshot } = rowUpdate;
    let tableCall = this.getTableCallUpdate(table, id);
    tableCall.set({ ...rowUpdateSnapshot, deleteAt: "" });
  };
  componentDidMount() {
    this.getData("users");
    this.getData("customers");
    this.getData("employees");
    this.getData("categories");
    this.getData("products");
    this.getData("orders");
    this.authListener();
  }

  authListener = () => {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  render() {
    const {
      isLoaded,
      users,
      customers,
      employees,
      categories,
      products,
      orders,
      user
    } = this.state;
    return (
      <>
        {user ? (
          <Router>
            <Header />
            <LeftMenu />
            {isLoaded ? (
              <>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={() => (
                      <Home orders={orders} products={products} customers={customers}/>
                    )}
                  />
                  <Route
                    path="/users"
                    component={() => (
                      <Users
                        users={users}
                        addNew={this.addNew}
                        update={this.update}
                        deleteItem={this.deleteItem}
                        undoDelete={this.undoDelete}
                      />
                    )}
                  />
                  <Route
                    path="/customers"
                    component={() => (
                      <Customers
                        customers={customers}
                        undoDelete={this.undoDelete}
                        addNew={this.addNew}
                        update={this.update}
                        deleteItem={this.deleteItem}
                      />
                    )}
                  />
                  <Route
                    path="/employees"
                    component={() => (
                      <Employees
                        employees={employees}
                        addNew={this.addNew}
                        update={this.update}
                        undoDelete={this.undoDelete}
                        deleteItem={this.deleteItem}
                      />
                    )}
                  />
                  <Route
                    path="/categories"
                    component={() => (
                      <Categories
                        categories={categories}
                        addNew={this.addNew}
                        update={this.update}
                        deleteItem={this.deleteItem}
                        undoDelete={this.undoDelete}
                      />
                    )}
                  />
                  <Route
                    path="/products"
                    component={() => (
                      <Products
                        products={products}
                        categories={categories}
                        addNew={this.addNew}
                        update={this.update}
                        deleteItem={this.deleteItem}
                        undoDelete={this.undoDelete}
                      />
                    )}
                  />
                  <Route
                    path="/orders"
                    component={() => (
                      <Orders
                        listProducts={products}
                        orders={orders}
                        customers={customers}
                        addNew={this.addNew}
                        deleteItem={this.deleteItem}
                        update={this.update}
                        undoDelete={this.undoDelete}
                      />
                    )}
                  />
                </Switch>
              </>
            ) : (
              <IsLoading />
            )}
            <Footer />
          </Router>
        ) : (
          <Router>
            <Switch>
              <Route
                path="/"
                component={() => <Login users={users} addNew={this.addNew} />}
              />
              <Route component={() => <NotFound />} />
            </Switch>
          </Router>
        )}
        )
      </>
    );
  }
}
const App = withFirebase(AppBase);
export default App;
