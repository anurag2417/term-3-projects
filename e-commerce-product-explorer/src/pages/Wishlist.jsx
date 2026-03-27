import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(CartContext);

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Start adding items you love to your wishlist!</p>
            <Link to="/products" className="shop-now-btn">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-title">My Wishlist</h1>
        <p className="wishlist-subtitle">{wishlistItems.length} items saved</p>

        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <motion.div
              key={item.productId}
              className="wishlist-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Link to={`/products/${item.productId}`} className="wishlist-item-link">
                <img src={item.image} alt={item.title} className="wishlist-item-image" />
              </Link>
              
              <div className="wishlist-item-info">
                <Link to={`/products/${item.productId}`} className="wishlist-item-title">
                  {item.title}
                </Link>
                <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                
                <div className="wishlist-item-actions">
                  <button
                    onClick={() => addToCart({ id: item.productId, title: item.title, price: item.price, image: item.image })}
                    className="move-to-cart-btn"
                  >
                    <FiShoppingCart /> Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="remove-wishlist-btn"
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;