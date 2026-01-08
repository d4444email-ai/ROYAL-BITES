import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { CartContext } from '../App';
import { StorageService } from '../services/storageService';

const Navbar: React.FC = () => {
  const { cart, user, logout } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = (path: string) => `
    font-sans font-medium px-3 py-2 rounded-md transition-colors
    ${location.pathname === path ? 'text-royal-gold' : 'text-white hover:text-royal-gold'}
  `;

  return (
    <nav className="sticky top-0 z-40 w-full bg-royal-dark text-white shadow-md border-b border-royal-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-royal-gold tracking-wide">ROYAL BITES</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/menu" className={navLinkClass('/menu')}>Menu</Link>
            {user && (
                 <Link to="/tracking" className={navLinkClass('/tracking')}>Orders</Link>
            )}
            <Link to="/about" className={navLinkClass('/about')}>About</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-white hover:text-royal-gold transition">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-royal-red rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <Link to="/admin" className="hidden sm:flex items-center gap-1 text-royal-gold hover:text-white text-sm">
                    <LayoutDashboard size={16} /> Admin
                  </Link>
                )}
                <span className="text-sm font-medium hidden sm:block text-gray-300">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-sm font-medium bg-royal-gold text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                <UserIcon size={16} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
