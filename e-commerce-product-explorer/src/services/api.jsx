// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products by category');
  }
};