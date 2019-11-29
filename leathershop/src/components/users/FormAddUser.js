import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FormAddnewUser extends Component {
  state = {
    isOpenForm: false,
    newUser: {
      email: "",
      password: "",
      role: ""
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      newUser: {
        ...prevState.newUser,
        [name]: value,
      }
    }));
  };

  checkValid = () => {
    const { email, password } = this.state.newUser;
    let errors = [];
    if (!email) {
      errors.push("User's email is required!");
    }
    if (!password) {
      errors.push("User's pass is required!");
    }
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  addnewUser = event => {
    event.preventDefault();
    if (this.checkValid()) {
      this.props.addNew("users", this.state.newUser);
      this.setState({
        isOpenForm: false,
        newUser: {
          email: "",
          password: "",
          role: ""
        }
      });
    }
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
                        to="/users"
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
                    type="email"
                    name="email"
                    placeholder="Enter user's email"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <select
                    className="form-control"
                    onChange={this.handleChange}
                    name="role"
                  >
                    <option value="administrator">Admin</option>
                    <option value="customer">customer</option>
                  </select>
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn btn-form"
                    onClick={this.addnewUser}
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