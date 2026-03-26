// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiHome, FiGrid, FiShoppingBag } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartItemCount, wishlistItems } = useContext(CartContext);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/products', icon: FiGrid, label: 'Products' },
    { path: '/wishlist', icon: FiHeart, label: 'Wishlist', badge: wishlistItems.length },
    { path: '/cart', icon: FiShoppingCart, label: 'Cart', badge: getCartItemCount() },
    { path: '/checkout', icon: FiShoppingBag, label: 'Checkout' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">BotWilly</span>
          <span className="logo-sub">Shop</span>
        </Link>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;