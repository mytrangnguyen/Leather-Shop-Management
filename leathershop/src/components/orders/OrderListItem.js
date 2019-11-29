import React from "react";
import NumberFormat from "react-number-format";

export default function OrderListItem(props) {
  function deleteItem() {
    props.deleteItem("orders", props.item);
  }

  const { item, customers, listProducts } = props;

  const { products, orderDate, amount, idCus } = item;
  let nameCustomer = "";

  if (idCus) {
    let customer = customers.find(item => item.id === idCus);
    if (customer) {
      nameCustomer = customer.name;
    }
  } else {
    nameCustomer = "Guest";
  }

  let productsOrder = products.map(item => {
    let { name } = listProducts.find(product => product.id === item.id);
    return (
      <p key={item.id}>
        {name} &nbsp; x &nbsp; {item.quantity}
      </p>
    );
  });
  return (
    <tr>
      <td>{props.index}</td>
      <td>{nameCustomer}</td>
      <td>{orderDate}</td>
      <td>{productsOrder}</td>
      <td>
        <NumberFormat
          value={amount}
          displayType="text"
          thousandSeparator={true}
        />đ
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            window.confirm("Do you want to delete this task?")
              ? deleteItem()
              : ""
          }
        >
          <i className="fa fa-trash-o" />
        </button>
      </td>
    </tr>
  );
}
