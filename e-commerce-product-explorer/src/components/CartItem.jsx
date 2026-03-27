import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        
        <div className="cart-item-quantity">
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="quantity-btn"
          >
            <FiMinus />
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="quantity-btn"
          >
            <FiPlus />
          </button>
        </div>
        
        <p className="cart-item-total">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      
      <button
        onClick={() => onRemove(item.productId)}
        className="remove-btn"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

export default CartItem;