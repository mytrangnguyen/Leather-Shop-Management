import React from "react";
import NumberFormat from "react-number-format";

export default function ProductChoosedItem(props) {
  const { name, quantity, priceOut, image } = props.item;
  const { step } = props;

  function plusQuantity(event) {
    event.preventDefault();

    props.changeQuantity(props.item, 0, "plus");
  }

  function minusQuantity(event) {
    event.preventDefault();

    props.changeQuantity(props.item, 0, "minus");
  }

  function handleChangeQuantity(event) {
    props.changeQuantity(props.item, event.target.value);
  }

  function deleteCart(event) {
    event.preventDefault();
    props.deleteCart(props.item.id);
  }

  return (
    <li className="list-group-item checkbox">
      <div className="row">
        <div className="col-md-5">
          <p>{name}</p>
          {step === 2 ? <img src={image} alt="Product" width="100px" /> : ""}
        </div>
        <div>
          <button
            className="btn btn-warning margin btn-control"
            type="button"
            onClick={minusQuantity}
          >
            <i className="fa fa-minus" />
          </button>
          <input
            type="text"
            value={quantity}
            className="input-quantity"
            onChange={handleChangeQuantity}
          />
          <button
            className="btn btn-warning margin btn-control"
            type="button"
            onClick={plusQuantity}
          >
            <i className="fa fa-plus" />
          </button>
        </div>
        <div className="col-md-3">
          Price:{" "}
          <span>
            <NumberFormat
              value={priceOut * quantity}
              displayType="text"
              thousandSeparator={true}
            />
            đ
          </span>
        </div>
        <div>
          <button className="btn btn-danger" onClick={deleteCart}>
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    </li>
  );
}
