import React, { Component } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import NumberFormat from "react-number-format";

import ProductSearchItem from "./ProductSearchItem";
import ProductChoosedList from "./ProductChoosedList";
import CustomerSearchItem from "./CustomerSearchItem";

export default class FormAddNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      step: 1,
      readyToOrder: false,
      errors: [],
      resultSearchProd: [],
      resultSearchCus: [],
      productChoosed: [],
      valueSearch: "",
      name: "",
      address: "",
      birthday: "",
      phoneNumber: "",
      isMember: "normal"
    };
  }

  changeStateProductChoosed = () => {
    let productChoosed = JSON.parse(localStorage.getItem("items"));
    if (productChoosed && productChoosed.length !== 0) {
      this.setState({
        productChoosed,
        readyToOrder: true
      });
    } else {
      this.setState({
        productChoosed: [],
        readyToOrder: false
      });
    }
  };

  componentDidMount() {
    this.changeStateProductChoosed();
    let step = JSON.parse(localStorage.getItem("step")) || 1;
    this.setState({
      step
    });
  }

  nextStep = () => {
    this.setState({
      step: 2
    });
    localStorage.setItem("step", JSON.stringify(2));
  };

  backStep = () => {
    this.setState({
      step: 1
    });
    localStorage.setItem("step", JSON.stringify(1));
  };

  addToCart = item => {
    let data = JSON.parse(localStorage.getItem("items")) || [];

    const { id } = item;
    let index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index].quantity += 1;
    } else {
      data.push({
        id,
        quantity: 1
      });
    }
    localStorage.setItem("items", JSON.stringify(data));
    this.changeStateProductChoosed();
  };

  getCart = () => {
    return JSON.parse(localStorage.getItem("items")) || [];
  };

  deleteCart = id => {
    let data = this.getCart();

    let index = data.findIndex(item => item.id === id);

    data.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(data));
    this.changeStateProductChoosed();
    if (this.getCart().length <= 0) {
      this.backStep();
    }
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleChangeIsMember = type => {
    this.closeError();
    this.setState({
      isMember: type
    });
    if (type === "addNew") {
      this.setState({
        promotion: 0
      });
    }
  };

  searchProduct = () => {
    const { listProducts } = this.props;
    let searchValue = this.state.valueSearchProd;
    if (listProducts.length > 0) {
      let resultSearchProd = listProducts.filter(item => {
        if (!item.deleteAt && searchValue && item.quantity > 0) {
          return (
            item.name.toLowerCase().search(searchValue.toLowerCase()) !== -1
          );
        }
        return "";
      });
      this.setState({
        searchValue,
        resultSearchProd
      });
    }
  };

  searchCustomer = () => {
    const { customers } = this.props;

    let { valueSearchCus, optionSearchCus } = this.state;
    if (customers.length > 0) {
      let resultSearchCus = [];
      if (optionSearchCus === "name") {
        resultSearchCus = customers.filter(item => {
          if (!item.deleteAt) {
            return item.name.search(valueSearchCus) !== -1;
          }
          return "";
        });
      } else {
        resultSearchCus = customers.filter(item => {
          if (!item.deleteAt) {
            return item.phoneNumber.search(valueSearchCus) !== -1;
          }
          return "";
        });
      }
      this.setState({
        resultSearchCus
      });
    }
  };

  showListSearchProd = () => {
    const { resultSearchProd } = this.state;
    let listProductSearch = "";

    if (resultSearchProd) {
      listProductSearch = resultSearchProd.map(item => (
        <ProductSearchItem
          item={item}
          key={item.id}
          addToCart={this.addToCart}
        />
      ));
    }
    return listProductSearch;
  };

  showListSearchCus = () => {
    const { resultSearchCus, idCus } = this.state;
    let listCustomerSearch = "";

    if (resultSearchCus) {
      listCustomerSearch = resultSearchCus.map(item => (
        <CustomerSearchItem
          key={item.id}
          item={item}
          currentCus={idCus}
          checkCustomer={this.checkCustomer}
        />
      ));
    }
    return listCustomerSearch;
  };

  changeQuantity = ({ id, currQuantity, quantity }, plusQuantity, type) => {
    let data = JSON.parse(localStorage.getItem("items")) || [];

    let index = data.findIndex(item => item.id === id);

    if (type === "minus" && quantity > 0) {
      data[index].quantity -= 1;
    } else if (type === "plus" && quantity < currQuantity) {
      data[index].quantity += 1;
    } else if (quantity + plusQuantity < currQuantity) {
      data[index].quantity = +plusQuantity;
    }
    localStorage.setItem("items", JSON.stringify(data));
    this.changeStateProductChoosed();
  };

  calTotalPrice = () => {
    let data = JSON.parse(localStorage.getItem("items")) || [];
    const { listProducts } = this.props;
    let totalPrice = 0;
    if (data.length > 0 && listProducts.length > 0) {
      totalPrice = data.reduce((total, item) => {
        let { priceOut } = listProducts.find(product => product.id === item.id);
        return total + Number(priceOut) * Number(item.quantity);
      }, 0);
    }
    return totalPrice;
  };

  calPromotionPrice = () => {
    let promotion = this.state.promotion || 0;
    let totalPrice = this.calTotalPrice();
    let promotionPrice = totalPrice - (totalPrice / 100) * promotion;
    return promotionPrice;
  };

  checkCustomer = (idCus, promotion) => {
    this.setState({
      idCus,
      promotion
    });
  };

  validatePhoneNumber = number => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

  checkValidAddNewCus = () => {
    const { name, birthday, address, phoneNumber } = this.state;
    let index = this.props.customers.findIndex(
      item => item.phoneNumber === phoneNumber
    );
    let errors = [];
    if (!name) {
      errors.push("Customer's name is required!");
    }
    if (!birthday) {
      errors.push("Customer's birthday is required!");
    }
    if (!address) {
      errors.push("Customer's address is required!");
    }
    if (!phoneNumber) {
      errors.push("Customer's phone number is required!");
    } else if (
      !this.validatePhoneNumber(phoneNumber) ||
      phoneNumber.length !== 10
    ) {
      errors.push("Customer's phone number is invalid!");
    } else if (index !== -1) {
      errors.push("Customer's phone number is already exist!");
    }
    if (errors.length > 0) {
      this.setState(prevState => ({
        ...prevState,
        errors
      }));
      return 0;
    }

    return 1;
  };

  checkValidChooseMember = () => {
    const { idCus } = this.state;
    let errors = [];
    if (!idCus || idCus === "") {
      errors.push("Please choose customer!!");
    }
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  changeQuantityWhenAddOrder = carts => {
    const { listProducts } = this.props;
    carts.map(item => {
      let product = listProducts.find(product => product.id === item.id);

      product.quantity -= item.quantity;
      let quantitySaled = product.quantitySaled || 0;
      quantitySaled += item.quantity;
      product.quantitySaled = quantitySaled;
      this.props.update("products", product);
      return "";
    });
  };

  addNewOrder = () => {
    let carts = JSON.parse(localStorage.getItem("items")) || [];
    const { name, address, phoneNumber, birthday, isMember } = this.state;
    let score = Math.floor(this.calTotalPrice() / 500000);
    let date = new Date();
    let orderDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    let infoOrder = {
      orderDate: orderDate,
      amount: this.calPromotionPrice(),
      products: carts
    };

    if (isMember === "normal") {
      this.props.addNew("orders", {
        ...infoOrder
      });
      this.changeQuantityWhenAddOrder(carts);
      localStorage.clear();
    }

    if (isMember === "addNew") {
      if (this.checkValidAddNewCus()) {
        let idCus = this.props.addNew("customers", {
          name,
          address,
          phoneNumber,
          birthday,
          score
        });
        this.props.addNew("orders", {
          ...infoOrder,
          idCus
        });

        this.changeQuantityWhenAddOrder(carts);
        localStorage.clear();
      }
    }

    if (isMember === "member") {
      if (this.checkValidChooseMember()) {
        const { customers } = this.props;
        const { idCus } = this.state;
        let customer = customers.find(item => item.id === idCus);
        let newScore = +customer.score + score;
        this.props.addNew("orders", {
          ...infoOrder,
          idCus
        });
        this.props.update("customers", { ...customer, score: newScore });
        this.changeQuantityWhenAddOrder(carts);
        localStorage.clear();
      }
    }
  };

  closeError = () => {
    this.setState({
      errors: []
    });
  };

  render() {
    const {
      isOpenForm,
      errors,
      step,
      readyToOrder,
      productChoosed,
      isMember
    } = this.state;
    const { listProducts } = this.props;

    const totalPrice = this.calPromotionPrice();
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <button
              type="button"
              className="btn btn-form"
              onClick={this.handleOpenForm}
            >
              {isOpenForm ? "CANCEL" : "ADD NEW"}
            </button>
          </div>
          {isOpenForm ? (
            <div className="panel-body row" id="form-add">
              {errors.length > 0 ? (
                <>
                  <div className="col-md-1" />
                  <div className="alert alert-danger col-md-10">
                    <Link
                      to="/orders"
                      className="close"
                      onClick={this.closeError}
                    >
                      ×
                    </Link>
                    <ul>
                      {errors.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
              {step === 1 ? (
                <>
                  <div className="choose-product form-group col-md-5">
                    <div className="solugan">
                      <div className="box-product-head">
                        <span className="box-title">CHOOSE PRODUCT</span>
                        <span className="af-ter" />
                      </div>
                    </div>
                    <div className="row search-product">
                      <div className="offset-md-2 col-md-6 input-search">
                        <input
                          type="text"
                          placeholder="Search.."
                          name="valueSearchProd"
                          className="form-control"
                          onChange={this.handleChange}
                          onKeyPress={this.searchProduct}
                        />
                      </div>
                      <div className="col-md-1">
                        <button
                          type="button"
                          className="btn btn-form"
                          onClick={this.searchProduct}
                        >
                          <i className="fa fa-search" />
                        </button>
                      </div>
                      <div className="searchResult col-md-12">
                        <ul className="list-group col-md-11 offset-md-1">
                          {this.showListSearchProd()}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="solugan">
                      <div className="box-product-head">
                        <span className="box-title">LIST PRODUCT</span>
                        <span className="af-ter" />
                      </div>
                      <ProductChoosedList
                        listProducts={listProducts}
                        productChoosed={productChoosed}
                        deleteCart={this.deleteCart}
                        step={step}
                        changeQuantity={this.changeQuantity}
                      />
                      {readyToOrder ? (
                        <div className="offset-md-10">
                          <button
                            className="btn btn-form"
                            onClick={this.nextStep}
                          >
                            NEXT
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="box-product-head">
                      <span className="box-title">CUSTOMER INFORMATION</span>
                      <span className="af-ter" />
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => this.handleChangeIsMember("member")}
                        >
                          MEMBER
                        </button>
                      </div>
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handleChangeIsMember("addNew")}
                        >
                          ADD NEW
                        </button>
                      </div>
                    </div>
                    {isMember === "addNew" && (
                      <form className="form-add-customer row">
                        <div className="form-group col-md-6">
                          <label>Customer's name:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Enter customer's name"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Customer's birthday:</label>
                          <input
                            className="form-control"
                            type="date"
                            name="birthday"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Customer's address:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="address"
                            placeholder="Enter customer's address"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Customer's phone number:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter customer's phone number"
                            onChange={this.handleChange}
                          />
                        </div>
                      </form>
                    )}
                    {isMember === "member" && (
                      <div className="row search-customer">
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            name="optionSearchCus"
                            onChange={this.handleChange}
                          >
                            <option value="phoneNumber">Phone Number</option>
                            <option value="name">Name</option>
                          </select>
                        </div>
                        <div className="col-md-4 input-search">
                          <input
                            type="text"
                            placeholder="Search.."
                            name="valueSearchCus"
                            className="form-control"
                            onKeyPress={this.searchCustomer}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-form"
                            onClick={this.searchCustomer}
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                        <div className="searchResult col-md-12">
                          <ul className="list-group col-md-10 offset-md-1">
                            {this.showListSearchCus()}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <div className="box-product-head">
                      <span className="box-title">LIST PRODUCT</span>
                      <span className="af-ter" />
                    </div>
                    <ProductChoosedList
                      listProducts={listProducts}
                      productChoosed={productChoosed}
                      step={step}
                      deleteCart={this.deleteCart}
                      changeQuantity={this.changeQuantity}
                    />
                    <div className="offset-md-8">
                      <h3>
                        Total price:{" "}
                        <NumberFormat
                          value={totalPrice}
                          displayType="text"
                          thousandSeparator={true}
                        />
                        đ
                      </h3>
                    </div>
                    <button className="btn btn-form" onClick={this.backStep}>
                      BACK
                    </button>
                    <button
                      type="button"
                      className="btn btn-form offset-md-10"
                      onClick={this.addNewOrder}
                    >
                      ORDER
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
