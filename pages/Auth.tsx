import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from '../App';
import { StorageService } from '../services/storageService';
import { User } from '../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Login Logic
    let user: User;
    if (email === 'admin@royal.com' && password === 'admin') {
      user = { id: 'admin1', name: 'Admin User', email, role: 'admin' };
    } else {
      user = { id: 'user1', name: 'John Doe', email, role: 'customer' };
    }
    
    StorageService.setCurrentUser(user);
    login(user);
    navigate(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-12">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-royal-dark">Welcome Back</h2>
          <p className="text-gray-500">Sign in to access your royal account.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal-gold focus:outline-none"
              placeholder="admin@royal.com or user@test.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal-gold focus:outline-none"
              placeholder="admin or anything"
              required 
            />
          </div>
          <button type="submit" className="w-full bg-royal-dark text-white py-3 rounded-lg font-bold hover:bg-royal-gold transition duration-300">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Demo Admin: admin@royal.com / admin</p>
        </div>
      </div>
    </div>
  );
};