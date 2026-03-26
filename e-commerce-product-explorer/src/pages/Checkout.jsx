// src/pages/Checkout.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('Zip code is required'),
  cardNumber: yup.string().required('Card number is required').matches(/^\d{16}$/, 'Invalid card number'),
  expiryDate: yup.string().required('Expiry date is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: yup.string().required('CVV is required').matches(/^\d{3,4}$/, 'Invalid CVV')
});

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="checkout-container">
          <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
            <div className="form-section">
              <h3>Shipping Information</h3>
              
              <div className="form-group">
                <label>Full Name</label>
                <input {...register('fullName')} className="form-input" />
                {errors.fullName && <p className="error">{errors.fullName.message}</p>}
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input {...register('email')} type="email" className="form-input" />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <input {...register('address')} className="form-input" />
                {errors.address && <p className="error">{errors.address.message}</p>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input {...register('city')} className="form-input" />
                  {errors.city && <p className="error">{errors.city.message}</p>}
                </div>
                
                <div className="form-group">
                  <label>Zip Code</label>
                  <input {...register('zipCode')} className="form-input" />
                  {errors.zipCode && <p className="error">{errors.zipCode.message}</p>}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Payment Information</h3>
              
              <div className="form-group">
                <label>Card Number</label>
                <input {...register('cardNumber')} placeholder="1234 5678 9012 3456" className="form-input" />
                {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input {...register('expiryDate')} placeholder="MM/YY" className="form-input" />
                  {errors.expiryDate && <p className="error">{errors.expiryDate.message}</p>}
                </div>
                
                <div className="form-group">
                  <label>CVV</label>
                  <input {...register('cvv')} type="password" placeholder="123" className="form-input" />
                  {errors.cvv && <p className="error">{errors.cvv.message}</p>}
                </div>
              </div>
            </div>
            
            <button type="submit" className="place-order-btn" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </form>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.productId} className="order-item">
                  <img src={item.image} alt={item.title} className="order-item-image" />
                  <div className="order-item-details">
                    <p className="order-item-title">{item.title.substring(0, 40)}...</p>
                    <p className="order-item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <p className="order-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;