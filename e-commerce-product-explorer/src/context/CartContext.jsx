/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        toast.info(`Updated ${product.title} quantity in cart`);
        return prevItems.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      toast.success(`${product.title} added to cart`);
      return [...prevItems, {
        productId: product.id,
        quantity: quantity,
        price: product.price,
        title: product.title,
        image: product.image
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.productId === productId);
      if (removedItem) {
        toast.info(`${removedItem.title} removed from cart`);
      }
      return prevItems.filter(item => item.productId !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      if (prevItems.find(item => item.productId === product.id)) {
        toast.info(`${product.title} is already in wishlist`);
        return prevItems;
      }
      toast.success(`${product.title} added to wishlist`);
      return [...prevItems, {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => {
      const removedItem = prevItems.find(item => item.productId === productId);
      if (removedItem) {
        toast.info(`${removedItem.title} removed from wishlist`);
      }
      return prevItems.filter(item => item.productId !== productId);
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToWishlist,
      removeFromWishlist,
      getCartTotal,
      getCartItemCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};