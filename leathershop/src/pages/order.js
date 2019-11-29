import React from "react";

import FormAddNewOrder from "../components/orders/FormAddNewOrder";
import OrderList from "../components/orders/OrderList";
import Title from "../components/layouts/Title";

const Orders = props => {
  const {
    addNew,
    listProducts,
    orders,
    customers,
    deleteItem,
    update,
    undoDelete
  } = props;
  return (
    <>
      <main className="app-content">
        <Title
          title="Orders"
          description="Manage Orders"
          icon="fa fa-shopping-cart"
        />
        <div className="container">
          <FormAddNewOrder
            addNew={addNew}
            listProducts={listProducts}
            customers={customers}
            update={update}
          />
          <OrderList
            orders={orders}
            listProducts={listProducts}
            customers={customers}
            deleteItem={deleteItem}
            undoDelete={undoDelete}
          />
        </div>
      </main>
    </>
  );
};

export default Orders;
