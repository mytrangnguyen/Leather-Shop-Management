import React from "react";

export default function CustomerSearchItem(props) {
  const { currentCus, item } = props;
  const { name, phoneNumber, score, id } = item;
  let promotion = score > 10 ? score - 10 : 0;
  function checkCustomer() {
    props.checkCustomer(props.item.id, promotion);
  }

  return (
    <li className="list-group-item checkbox">
      <div className="row">
        <div className="col-md-1 offset-md-1">
          <input
            type="radio"
            className="form-control"
            name="customer"
            onChange={checkCustomer}
            defaultChecked={currentCus === id}
          />
        </div>
        <div className="col-md-3">
          <p>{name}</p>
        </div>
        <div className="col-md-3">
          <p>{phoneNumber}</p>
        </div>
        <div className="col-md-2">
          <p>
            <i className="fa fa-sort-amount-desc" /> &nbsp;
            {promotion} %
          </p>
        </div>
        &nbsp;
      </div>
    </li>
  );
}
