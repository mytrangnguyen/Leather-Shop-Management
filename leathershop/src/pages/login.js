import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";
import { Link } from "react-router-dom";

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        email: "",
        password: "",
        role: "customer"
      },
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      errors: []
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      newUser: {
        ...prevState.newUser,
        [name]: value
      }
    }));
  };

  checkValidate = () => {
    let errors = [];
    const { email, password } = this.state.newUser;
    if (!email) {
      errors.push("Email is required");
    }
    else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      errors.push("Email is invalid");
    }
    if (!password) {
      errors.push("Password is required");
    }
    
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  loginClick = event => {
    let errors = [];
    const { email, password } = this.state.newUser;
    event.preventDefault();
    if (this.checkValidate()) {
      this.props.firebase.auth
        .signInWithEmailAndPassword(email, password)
        .then(u => {})
        .catch(error => {
          errors.push(error.message);
          this.setState({
            errors
          });
        });
    }
  };

  closeError = () => {
    this.setState({
      errors: []
    });
  };

  signupClick = event => {
    const { email, password } = this.state.newUser;
    event.preventDefault();
    this.props.firebase.auth
      .createUserWithEmailAndPassword(email, password)
      .then(ok => {
        this.props.addNew("users", this.state.newUser);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className=" container-login">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              {errors.length > 0 ? (
                <>
                  <div className="alert alert-danger">
                    <Link to="/" className="close" onClick={this.closeError}>
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
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                    </span>
                  </div>
                  <input
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key" aria-hidden="true" />
                    </span>
                  </div>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn float-left login_btn "
                    onClick={this.loginClick}
                    value="Log In"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn float-right signup_btn "
                    onClick={this.signupClick}
                    value="Sign Up"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Login = withFirebase(LoginBase);
export default Login;
