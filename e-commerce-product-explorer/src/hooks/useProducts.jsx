import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      } else {
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    // Sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  return {
    products: filteredProducts,
    allProducts: products,
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
  };
};