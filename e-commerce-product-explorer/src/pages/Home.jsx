// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import './Home.css';

const Home = () => {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Welcome to BotWilly Shop</h1>
          <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </motion.div>

      <div className="container">
        <section className="featured-section">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="loading-spinner" />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
            <div className="feature-card">
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="feature-card">
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;