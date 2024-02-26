/* eslint-disable */
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ProductCardProps {
  brand: string;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  brand,
  title,
  price,
  originalPrice,
  imageUrl,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='product-card'>
      <div className='image-container'>
        <img src={imageUrl} alt={title} />
      </div>
      <div className='product-info'>
        <div className='brand'>{brand}</div>
        <div className='title'>{title}</div>
        <div className='price'>
          <span className='sale-price'>${price}</span>
          <span className='original-price'>${originalPrice}</span>
        </div>
        <div className='buttons'>
          <button
            data-testid='fav-check-component-div-id'
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
          </button>
          <button className='add-to-cart-btn'>Add to Cart</button>
        </div>
      </div>
      <style jsx>{`
        .product-card {
          width: 200px;
          height: 350px;
          min-height: 300px;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow: hidden;
          background: white;
          margin-right: 15px;
        }

        .image-container {
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          flex-grow: 1;
          padding: 10px;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-info h3 {
          font-size: 16px;
          color: #333;
        }

        .brand {
          font-size: 13px;
          color: #333;
        }

        .price {
          margin: 10px 0;
        }

        .sale-price {
          font-weight: bold;
          color: black;
        }

        .original-price {
          text-decoration: line-through;
          margin-left: 10px;
          color: #777;
        }

        .buttons {
          display: flex;
          gap: 5px;
        }

        .favorite-btn,
        .add-to-cart-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          transition: all 0.3s ease;
          border-radius: 4px; // This should match your site's design for consistency
        }

        .favorite-btn {
          width: 40px; // Make the button square
          height: 40px; // Match the height of the "Add to Cart" button
          border: 1px solid #ccc;
          background: none;
          cursor: pointer;
        }

        .add-to-cart-btn {
          flex-grow: 1; // Allows the button to fill the remaining space
          background: black;
          color: white;
          border: none;
          cursor: pointer;
        }

        .add-to-cart-btn:hover {
          background: #333;
        }

        .favorite-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ccc;
          background: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .favorite-btn.active {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
