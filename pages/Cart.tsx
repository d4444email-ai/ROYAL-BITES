import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';
import { CartContext } from '../App';
import { StorageService } from '../services/storageService';
import { Order } from '../types';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, user } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=cart');
      return;
    }
    setIsCheckingOut(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        userId: user.id,
        customerName: user.name,
        items: [...cart],
        total: total,
        status: 'Pending',
        date: new Date().toISOString()
      };
      
      StorageService.saveOrder(newOrder);
      clearCart();
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-100 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-royal-dark mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-8">Your royal feast is being prepared. You can track its status in your profile.</p>
          <div className="flex flex-col gap-3">
            <Link to="/tracking" className="bg-royal-gold text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
              Track Order
            </Link>
            <Link to="/" className="text-gray-500 hover:text-royal-dark font-medium">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-white drop-shadow-md mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">Your cart is currently empty, Your Majesty.</p>
            <Link to="/menu" className="inline-block bg-royal-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-royal-gold transition">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100 shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-bold text-royal-dark">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-royal-dark w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-black">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 text-sm mt-2 flex items-center justify-end gap-1 ml-auto"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:w-96">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-royal-dark mb-6">Order Summary</h2>
                <div className="space-y-3 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-royal-dark mb-8">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-royal-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    'Processing...'
                  ) : (
                    <>Checkout <ArrowRight size={20} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;