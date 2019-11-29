import React, { Component } from "react";
import { withFirebase } from "../components/Firebase";

const AdminPage = () => {
  return (
    <div className="container">
      Admin page
      <Users />
      <FormAddUser />
    </div>
  );
};

export class FormAddUserBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  addNewUser = () => {
    const { username, password } = this.state;
    this.props.firebase.users().push({ username, password });
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <input
            type="text"
            name="username"
            className="form-control col-sm-6"
            defaultValue={username}
            onChange={this.handleChange}
            placeholder="Enter username"
          />
          <input
            type="text"
            name="password"
            className="form-control col-sm-6"
            defaultValue={password}
            onChange={this.handleChange}
            placeholder="Enter password"
          />{" "}
        </div>

        <button
          type="button"
          onClick={this.addNewUser}
          className="btn btn-success"
        >
          ADD
        </button>
      </form>
    );
  }
}

const FormAddUser = withFirebase(FormAddUserBase);

class UsersBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const userObject = snapshot.val();

      if (userObject) {
        const objectList = Object.keys(userObject).map(key => ({
          ...userObject[key],
          id: key
        }));

        this.setState({
          users: objectList,
          loading: false
        });
      } else {
        this.setState({ users: null, loading: false });
      }
    });
  }

  render() {
    const { users } = this.state;
    console.log(users);
    return (
      <div>
        LIST OF USERS
        <ul>
          {users.map((item, index) => {
            return <li key={index}>{item.username}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const Users = withFirebase(UsersBase);

export default AdminPage;
