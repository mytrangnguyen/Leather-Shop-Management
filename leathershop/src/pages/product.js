import React from "react";

import { FormAddNewProduct } from "../components/products/FormAddProduct";
import ProductList from "../components/products/ProductList";
import Title from "../components/layouts/Title";

const Products = props => {
  const {
    addNew,
    update,
    categories,
    products,
    deleteItem,
    undoDelete
  } = props;
  return (
    <>
      <main className="app-content">
        <Title
          title="Products"
          description="Manage Product"
          icon="fa fa-product-hunt"
        />
        <FormAddNewProduct
          addNew={addNew}
          update={update}
          categories={categories}
        />
        <ProductList
          products={products}
          categories={categories}
          update={update}
          deleteItem={deleteItem}
          undoDelete={undoDelete}
        />
      </main>
    </>
  );
};

export default Products;
