/* eslint-disable */
import React from "react";
import ProductCard from "./productCard";

interface ProductListProps {
  products: {
    brand: string;
    name: string;
    discount_price: number;
    regular_price: number;
    images: any;
  }[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard
          key={product.name}
          brand={product.brand}
          title={product.name}
          price={product.discount_price}
          originalPrice={product.regular_price}
          imageUrl={product.images[0]}
        />
      ))}
      <style jsx>{`
        .product-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
