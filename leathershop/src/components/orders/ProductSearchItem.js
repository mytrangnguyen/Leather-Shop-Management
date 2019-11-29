import React from "react";

export default function cartsearchItem(props) {
  function addToCart(event){
    event.preventDefault();

    props.addToCart(props.item);
  };

  const { name } = props.item;
  return (
    <li className="list-group-item checkbox">
      <div className="row">
        <div className="col-md-9 offset-md-1">
          <p>{name}</p>
        </div>
        <div>
          <button
            className="btn btn-warning margin btn-control"
            type="button"
            onClick={addToCart}
          >
            <i className="fa fa-arrow-right" />
          </button>
        </div>
        &nbsp;
      </div>
    </li>
  );
}
