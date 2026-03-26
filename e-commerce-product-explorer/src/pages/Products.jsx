// src/pages/Products.js
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import CategoryTabs from '../components/CategoryTabs';
import './Products.css';

const Products = () => {
  const {
    products,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  } = useProducts();

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Our Products</h1>
          <p className="page-description">
            Browse our collection of high-quality products
          </p>
        </div>

        <CategoryTabs
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading ? (
          <div className="loading-spinner" />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="products-count">
              Found {products.length} products
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;