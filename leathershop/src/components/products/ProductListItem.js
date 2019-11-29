import React from "react";
import { withFirebase } from "../Firebase";
import NumberFormat from "react-number-format";

class ProductListItemBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      updateProduct: this.props.item
    };
  }

  hanleUpdate = () => {
    this.setState(prevState => ({
      isUpdating: !prevState.isUpdating
    }));
  };

  handleChangeImage = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({ image });
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      updateProduct: {
        ...prevState.updateProduct,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    const { image, updateProduct } = this.state;
    console.log(image);
    if (image) {
      const uploadTask = this.props.firebase.storage
        .ref(`images/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          console.log("error", error);
        },
        () => {
          this.props.firebase.storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState(prevState => ({
                ...prevState,
                updateProduct: {
                  ...prevState.updateProduct,
                  image: url
                }
              }));
              this.props.update("products", {
                ...updateProduct,
                image: url
              });
            });
        }
      );
    } else {
      this.props.update("products", updateProduct);
    }
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("products", this.state.updateProduct);
  };
  undoDelete = () => {
    this.props.undoDelete("products", this.state.updateProduct);
  };

  render() {
    const { categories } = this.props;
    const { isUpdating } = this.state;
    const {
      cateID,
      dateAdd,
      image,
      name,
      priceIn,
      priceOut,
      pricePromotion,
      quantity,
      quantitySaled,
      deleteAt,
      key
    } = this.props.item;

    return (
      <>
        <tr
          className={`${isUpdating ? "" : "disable"} ${
            deleteAt ? "deleted" : ""
          }`}
        >
          <td key={key} width="149px">
            <select
              onChange={this.handleChange}
              defaultValue={cateID}
              name="cateID"
              className={`form-control ${isUpdating ? "" : "disable"}`}
            >
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.cateName}
                </option>
              ))}
            </select>
          </td>
          <td width="320px">
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="name"
              defaultValue={name}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="image"
              src={image}
              defaultValue={isUpdating ? image : ""}
              alt="Not Found"
              height="100px"
              width="100px"
              name="image"
            />
            {isUpdating ? (
              <input
                name="image"
                type="file"
                placeholder="Please choose a product's image"
                className="form-control"
                onChange={this.handleChangeImage}
                required
              />
            ) : (
              ""
            )}
          </td>
          <td>
            <input
              type="date"
              className="form-control"
              name="dateAdd"
              defaultValue={dateAdd}
              onChange={this.handleChange}
            />
          </td>
          <td>
          {isUpdating ? (
              <input
                type="text"
                className="form-control"
                name="priceIn"
                defaultValue={priceIn}
                onChange={this.handleChange}
              />
            ) : (
              <>
                <NumberFormat
                  value={priceIn}
                  displayType="text"
                  thousandSeparator={true}
                />
                đ
              </>
            )}
          </td>
          <td>
            {isUpdating ? (
              <input
                type="text"
                className="form-control"
                name="priceOut"
                defaultValue={priceOut}
                onChange={this.handleChange}
              />
            ) : (
              <>
                <NumberFormat
                  value={priceOut}
                  displayType="text"
                  thousandSeparator={true}
                />
                đ
              </>
            )}
          </td>
          <td width="50px">
            <input
              type="number"
              className="form-control"
              name="quantity"
              defaultValue={quantity}
              onChange={this.handleChange}
              min="0"
            />
          </td>
          <td width="50px">
            <input
              type="number"
              className="form-control"
              name="quantitySaled"
              defaultValue={quantitySaled === undefined ? 0 : quantitySaled}
              onChange={this.handleChange}
              min="0"
            />
          </td>
          <td width="200px">
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

const ProductListItem = withFirebase(ProductListItemBase);
export default ProductListItem;
