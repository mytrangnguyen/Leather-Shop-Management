import React, { Component } from 'react'

export default class CategoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      updateCategory: this.props.item
    };
  }

  hanleUpdate = () => {
    this.setState(prevState => ({
      isUpdating: !prevState.isUpdating
    }));
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      updateCategory: {
        ...prevState.updateCategory,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("categories", this.state.updateCategory);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("categories", this.state.updateCategory);
  };

  undoDelete = () => {
    this.props.undoDelete("categories", this.state.updateCategory);
  };

  render() {
    const { cateName, deleteAt } = this.props.item;
    const { isUpdating } = this.state;

    return (
      <>
        <tr
          className={`${isUpdating ? "" : "disable"} ${
            deleteAt ? "deleted" : ""
          }`}
        >
          <th>{this.props.index + 1}</th>
          <td>
            <input
              type="text"
              className="form-control"
              name="cateName"
              defaultValue={cateName}
              onChange={this.handleChange}
            />
          </td>
          <td>
          {isUpdating ? (
            <span>
              <button
                className="btn btn-success btn-control"
                onClick={this.saveUpdate}
              >
                <i className="fa fa-floppy-o" />
              </button>
              <button
                className="btn btn-secondary btn-control"
                onClick={this.hanleUpdate}
              >
                <i className="fa fa-ban" />
              </button>
            </span>
          ) : (
            <button
              className="btn btn-warning margin btn-control"
              onClick={this.hanleUpdate}
            >
              <i className="fa fa-pencil" />
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() =>
              window.confirm("Do you want to delete this task?")
                ? this.deleteItem()
                : ""
            }
          >
            <i className="fa fa-trash-o" />
          </button>
          &nbsp;
        </td>
        </tr>
      </>
    );
  }
}
