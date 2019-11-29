import React from "react";
import ProductListItem from "./ProductListItem";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: "",
      resultSearchProd: []
    };
  }

  searchProduct = props => {
    const { products } = this.props;
    let searchValue = this.state.valueSearchProd;
    if (products.length > 0) {
      let resultSearchProd = products.filter(item => {
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
    const { deleteItem, update, products, categories, undoDelete } = this.props;
    const { resultSearchProd } = this.state;
    let list = [];

    if (resultSearchProd.length > 0) {
      list = resultSearchProd;
    } else list = products;

    let listItems = list
      .filter(item => !item.deleteAt)
      .map(item => (
        <ProductListItem
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          update={update}
          categories={categories}
          undoDelete={undoDelete}
        />
      ));

    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">LIST OF PRODUCTS</h3>
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
                  <th>CATE NAME</th>
                  <th>NAME PRODUCT</th>
                  <th>IMAGE</th>
                  <th>DATE ADD</th>
                  <th>PRICE IN</th>
                  <th>PRICE OUT</th>
                  <th>QUANTITY</th>
                  <th>SALED QUANTITY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>{listItems}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
