import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Make sure to install @mui/icons-material
import FavoriteIcon from "@mui/icons-material/Favorite";

type ProductDetailsProps = {
  brand: string;
  title: string;
  salePrice: number | null;
  regularPrice: number;
  sizes: any;
  stock: any; // Assuming colors are provided as hex codes
  images: any;
};

const ProductDetails = ({
  brand,
  title,
  salePrice,
  regularPrice,
  sizes,
  stock,
  images,
}: ProductDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorClick = (colorName, quantity) => {
    if (quantity > 0) {
      setSelectedColor(colorName);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const selectSize = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='product-details-card'>
      {images.length > 1 && (
        <div className='thumbnail-container'>
          {images.map((image, index) => (
            <img
              key={`thumbnail-${image}`}
              src={image}
              alt={`Thumbnail ${index}`}
              className='thumbnail'
            />
          ))}
        </div>
      )}
      <div className={`main-image-container ${images.length > 1 ? "" : "full-width"}`}>
        <img src={images[0]} alt='Main Product' className='main-image' />
      </div>
      <div className='details-section'>
        <span className='brand-name'>{brand}</span>
        <p className='title'>{title}</p>
        <div className='prices'>
          {salePrice ? <span className='sale-price'>{`$${salePrice.toFixed(2)}`}</span> : null}
          <span className='regular-price'>{`$${regularPrice.toFixed(2)}`}</span>
        </div>
        <div className='size-section'>
          <p className='size-title'>Size</p>
          {sizes.map((size) => (
            <span
              data-testid='size-check-component-div-id'
              key={size}
              className={`size ${selectedSize === size ? "selected" : ""}`}
              onClick={() => selectSize(size)}>
              {size}
            </span>
          ))}
        </div>
        <div className='color-section'>
          <p className='color-title'>Color</p>
          {Object.entries(stock).map(([colorName, quantity]) => (
            <span
              data-testid='in-out-stock-check-component-div-id'
              key={colorName}
              className={`color ${selectedColor === colorName ? "selected" : ""} ${
                quantity === 0 ? "out-of-stock" : ""
              }`}
              style={{ backgroundColor: colorName }}
              onClick={() => handleColorClick(colorName, quantity)}
            />
          ))}
        </div>
        <div className='actions'>
          <button
            data-testid='fav-check-component-div-id'
            onClick={toggleFavorite}
            className='favorite-btn'
            type='button'>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </button>
          <button className='add-to-cart-btn' type='button'>
            Add to Cart
          </button>
        </div>
      </div>
      <style>{`
      .product-details-card .main-image-container {
        width: images.length > 1 ? '50%' : '100%'; /* Adjust based on the number of images */
      }

      .product-details-card {
        display: flex;
        background: white; /* Adjust the background as needed */
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* This adds a subtle shadow */
        border-radius: 8px; /* Rounded corners */
        overflow: hidden; /* Ensures the shadow doesn't leak outside the border */
        max-width: 800px; /* Adjust width as needed */
        margin: auto; /* Center the card */
      }
      
      .images-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .thumbnail-container {
        display: flex;
        flex-direction: column; /* Stack thumbnails vertically */
        justify-content: flex-start; /* Align to the top */
        align-items: center; /* Center thumbnails horizontally */
        padding: 20px 0; /* Padding at the top and bottom of the container */
        margin-right: 30px; /* Space between thumbnails and main image */
        margin-left: 30px
      }
      
      .thumbnail {
        width: 48px; /* Adjust width to be smaller */
        height: 60px; /* Adjust height to be the same as width for square aspect ratio */
        margin-bottom: 0.5rem; /* Space between thumbnails */
        object-fit: cover; /* Ensure the images cover the area without distortion */
        border: 1px solid #ddd; /* Optional: adds a border for better thumbnail visibility */
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional: adds a subtle shadow to the thumbnails */
      }
      
      .thumbnail:hover {
        opacity: 1; /* Full opacity on hover */
      }

      .main-image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%; /* Adjust the width as necessary */
        height: 50%;
        padding: 20px 0 20px;
        border-radius: 5px
      }      
      
      .main-image {
        width: 100%; /* Full width of its container */
        height: auto; /* Keep the aspect ratio */
        max-width: 300px; /* Optionally add a max-width to restrict the size further */
        margin: auto; /* Center the image if it's smaller than its container */
      }
      
      .details-section {
        width: 50%; /* Increased width */
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Align content to the top */
      }
      
      .brand-name {
        font-size: 0.85rem; /* Reduced font size */
        margin-bottom: 0.25rem;
        text-transform: uppercase; /* Brand name is usually uppercase */
        // color: #666;
      }
      
      .title {
        font-size: 1.2rem;
        margin: 0.5rem 0; /* Adjusted margin */
      }
      
      .prices-container {
        display: flex;
        align-items: baseline;
      }
      
      .sale-price {
        font-size: 1.2rem; /* Make price larger */
        font-weight: bold;
        color: #333; /* Darker color for the price */
        margin-right: 1rem;
      }
      
      .regular-price {
        font-size: 0.9rem; /* Smaller than the current price */
        text-decoration: line-through;
        color: #999;
      }
      
      .size-section {
        margin-top: 1rem; /* Add space above size options */
      }

      .size-title, .color-title {
        color: #666;
      }
      
      .size, .color {
        margin: 0 0.5rem 0.5rem 0; /* Space between and below options */
      }

      .size {
        padding: 0; /* Remove padding */
        margin: 0 0.5rem; /* Maintain some horizontal space between labels */
        cursor: pointer;
        font-weight: normal; /* Regular font weight */
        color: #777;; /* Default text color */
        border: none; /* No border */
        background-color: transparent; /* No background */
        transition: all 0.3s ease; /* Smooth transition for hover and selected effects */
      }
      
      .size:hover,
      .size.selected {
        font-weight: bold; /* Bold font weight when hovered or selected */
      }

      .color {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        border: 1px solid #ccc;
        cursor: pointer;
        position: relative;
        transition: border 0.3s, opacity 0.3s; /* Smooth transitions for styles */
      }
      
      .color.selected {
        border: 2px solid #000; /* Highlight selected color with a thicker border */
      }
      
      .color.out-of-stock {
        cursor: not-allowed; /* Change the cursor to indicate it's not selectable */
        opacity: 0.4; /* Lighten the color */
      }
      
      .color.out-of-stock::after {
        content: 'X'; /* Change content to 'X' or similar character */
        color: #ff0000; /* Red color for the 'X' */
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: larger; /* Larger font size for the 'X' */
        pointer-events: none;
      }
      
      .actions {
        margin-top: 1rem; /* Space above action buttons */
        display: flex;
        align-items: center;
      }
      
      .favorite-btn,
      .add-to-cart-btn {
        background: none;
        cursor: pointer;
        margin-right: 1rem; /* Space between buttons */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        transition: all 0.3s ease;
        border-radius: 4px; // This should match your site's design for consistency
      }

      .favorite-btn {
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      
      .add-to-cart-btn {
        height: 40px;
        background: black;
        color: white;
        cursor: pointer;
      }
      
      /* Adjust the button styles on hover */
      .favorite-btn:hover,
      .add-to-cart-btn:hover {
        opacity: 0.8;
      }
      `}</style>
    </div>
  );
};

export default ProductDetails;
