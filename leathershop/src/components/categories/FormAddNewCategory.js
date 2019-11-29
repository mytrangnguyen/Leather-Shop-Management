import React from "react";
import { Link } from "react-router-dom";

class FormAddNewCategories extends React.Component {
  state = {
    isOpenForm: false,
    newCategory: {
      cateName: ""
    },
    errors: []
  };
  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };
  checkValidate = () => {
    const { cateName } = this.state.newCategory;
    let errors = [];
    if (!cateName) {
      errors.push("Category's name is required!");
    }
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  addNewCategory = event => {
    event.preventDefault();
    if (this.checkValidate()) {
      this.props.addNew("categories", this.state.newCategory);
      this.setState({
        isOpenForm: false,
        newCategory: {
          cateName: ""
        }
      });
    }
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      newCategory: {
        cateName: value
      }
    }));
  };

  closeError = () => {
    this.setState({
      errors: []
    });
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
                        to="/categories"
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
                    placeholder="Enter category's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn btn-form"
                    onClick={this.addNewCategory}
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

export default FormAddNewCategories;
