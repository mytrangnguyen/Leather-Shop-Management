import React from "react";
import EmployeeListItem from "./EmployeeListItem";

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: "",
      resultSearchProd: []
    };
  }

  searchProduct = props => {
    const { employees } = this.props;
    let searchValue = this.state.valueSearchProd;
    if (employees.length > 0) {
      let resultSearchProd = employees.filter(item => {
        if (!item.deleteAt && searchValue) {
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
    console.log(this.state.valueSearch);
    console.log(this.state.resultSearchProd);
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { deleteItem, update, employees, undoDelete } = this.props;
    const {resultSearchProd} = this.state;
    let list = [];
    if (resultSearchProd.length > 0) {
      list = resultSearchProd;
    } else list = employees;
    let listItems = list
      .filter(item => !item.deleteAt)
      .map((item, index) => (
        <EmployeeListItem
          key={item.id}
          item={item}
          index={index}
          deleteItem={deleteItem}
          update={update}
          undoDelete={undoDelete}
        />
      ));
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">LIST OF EMPLOYEES</h3>
        </div>
        <div className="row search-product-pr">
          <div className=" col-md-3 input-search">
            <input
              type="text"
              size="35"
              placeholder="Search.."
              name="valueSearchProd"
              className="form-control"
              onChange={this.handleChange}
              onKeyPress={this.searchProduct}
            />
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-form">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
        <div className="panel-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>NAME EMPLOYEE</th>
                  <th>ADDRESS</th>
                  <th>ID CARD</th>
                  <th>EMAIL</th>
                  <th>SALARY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody id="studentList">{listItems}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default EmployeeList;
