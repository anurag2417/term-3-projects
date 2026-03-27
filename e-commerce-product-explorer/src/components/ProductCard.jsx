// src/components/ProductCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlistItems } = useContext(CartContext);
  const isInWishlist = wishlistItems.some(item => item.productId === product.id);

  return (
    <Motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="product-overlay">
            <span className="view-details">View Details</span>
          </div>
        </div>
      </Link>
      
      <div className="product-info">
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title}
        </Link>
        
        <div className="product-category">
          {product.category}
        </div>
        
        <div className="product-rating">
          <span className="rating-stars">
            {'★'.repeat(Math.floor(product.rating.rate))}
            {'☆'.repeat(5 - Math.floor(product.rating.rate))}
          </span>
          <span className="rating-count">({product.rating.count})</span>
        </div>
        
        <div className="product-price">
          ${product.price.toFixed(2)}
        </div>
        
        <div className="product-actions">
          <button
            className="btn-add-to-cart"
            onClick={() => addToCart(product)}
          >
            <FiShoppingCart /> Add to Cart
          </button>
          <button
            className={`btn-wishlist ${isInWishlist ? 'active' : ''}`}
            onClick={() => addToWishlist(product)}
          >
            <FiHeart />
          </button>
        </div>
      </div>
    </Motion.div>
  );
};

export default ProductCard;