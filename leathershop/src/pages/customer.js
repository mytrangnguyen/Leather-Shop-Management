import React from "react";

import { FormAddNewCustomer, CustomerList } from "../components/customers";
import Title from "../components/layouts/Title";

const Customers = props => {
  const { addNew, update, customers, deleteItem, undoDelete } = props;
  return (
    <>
      <main className="app-content">
      <Title title="Customer" description="Manage Customer" icon="fa fa-address-book"/>
        <div className="container">
          <FormAddNewCustomer addNew={addNew} customers={customers} />
          <CustomerList
            customers={customers}
            update={update}
            deleteItem={deleteItem}
            undoDelete={undoDelete}
          />
        </div>
      </main>
    </>
  );
};

export default Customers;
