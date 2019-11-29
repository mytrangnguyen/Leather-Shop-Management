import React from 'react';
import ProductChoosedItem from "./ProductChoosedItem";

export default function ProductChoosedList(props) {
  const {listProducts, productChoosed, step} = props;
  let productChoosedList = "";

  if (productChoosed.length > 0) {
    productChoosedList = productChoosed.map(cartItem => {
      const { id, quantity } = cartItem;
      let { name, priceOut, image, quantity: currQuantity} = listProducts.find(product => product.id === id);
      let item = {
        id,
        quantity,
        name,
        priceOut,
        image,
        currQuantity
      };
      return (
        <ProductChoosedItem
          item={item}
          step={step}
          key={item.id}
          changeQuantity={props.changeQuantity}
          deleteCart={props.deleteCart}
        />
      );
    });
  }
  return (
    <ul className="list-group">{productChoosedList}</ul>
  )
}
