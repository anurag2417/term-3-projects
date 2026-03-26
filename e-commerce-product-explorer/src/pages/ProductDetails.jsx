// src/pages/ProductDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fetchProductById } from '../services/api';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, wishlistItems } = useContext(CartContext);

  const isInWishlist = product && wishlistItems.some(item => item.productId === product.id);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setError(null);
      } catch {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  if (loading) return <div className="loading-spinner" />;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Product not found</div>;

  return (
    <div className="product-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft /> Back
        </button>

        <motion.div
          className="product-details-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="product-gallery">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="product-swiper"
            >
              <SwiperSlide>
                <img src={product.image} alt={product.title} className="gallery-image" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="product-info-details">
            <h1 className="product-title-details">{product.title}</h1>
            
            <div className="product-meta">
              <span className="product-category-details">{product.category}</span>
              <div className="product-rating-details">
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(product.rating.rate))}
                  {'☆'.repeat(5 - Math.floor(product.rating.rate))}
                </span>
                <span className="rating-count">({product.rating.count} reviews)</span>
              </div>
            </div>

            <div className="product-price-details">
              ${product.price.toFixed(2)}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-quantity">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions-details">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                onClick={handleAddToWishlist}
              >
                <FiHeart /> {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;