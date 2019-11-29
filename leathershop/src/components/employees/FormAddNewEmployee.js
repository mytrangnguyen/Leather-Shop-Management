import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FormAddNewEmployee extends Component {
  state = {
    isOpenForm: false,
    newEmployee: {
      name: "",
      address: "",
      email: "",
      idCard: "",
      salary: ""
    },
    errors: []
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  closeError = () => {
    this.setState({
      errors: []
    });
  };

  checkValid = () => {
    const { name, address, email, idCard, salary } = this.state.newEmployee;
    let errors = [];
    let index = this.props.employees.findIndex(item => item.idCard === idCard);
    let index1 = this.props.employees.findIndex(item => item.email === email);
    if (!name) {
      errors.push("Employee's name is required!");
    }
    if (!email) {
      errors.push("Employee's email is required!");
    } else if (index1 !== -1) {
      errors.push("Employee's email is already exist!");
    }

    if (!address) {
      errors.push("Employee's address is required!");
    }
    if (!idCard) {
      errors.push("Employee's ID card is required!");
    } else if (index !== -1) {
      errors.push("Employee's card ID is already exist!");
    }
    if (!salary) {
      errors.push("Employee's salary is required!");
    }
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  addnewEmployee = event => {
    event.preventDefault();
    if (this.checkValid()) {
      this.props.addNew("employees", this.state.newEmployee);
      this.setState({
        isOpenForm: false,
        newEmployee: {
          name: "",
          address: "",
          email: "",
          idCard: "",
          salary: ""
        }
      });
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      newEmployee: {
        ...prevState.newEmployee,
        [name]: value
      }
    }));
  };

  render() {
    const { isOpenForm, errors } = this.state;
    return (
      <div>
        <form>
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
                        to="/employees"
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
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter employee's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="address"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="Enter employee's address"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter employee's email"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="idCard"
                    type="text"
                    placeholder="Enter employee's card"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="salary"
                    type="text"
                    placeholder="Enter emnployee's salary"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn btn-form"
                    onClick={this.addnewEmployee}
                  >
                    ADD
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}
