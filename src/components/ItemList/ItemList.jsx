import { memo } from "react";
import Item from "../Item/Item"
import "./ItemList.css"

function ItemList({ products }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <Item product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}


export default memo(ItemList)