import React, { createContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import OrderTracking from './pages/OrderTracking';
import About from './pages/About';
import { Login } from './pages/Auth';
import AIChef from './components/AIChef';
import { Product, CartItem, User } from './types';
import { StorageService } from './services/storageService';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

// Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  user: null,
  login: () => {},
  logout: () => {},
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load session
    const currentUser = StorageService.getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const login = (userData: User) => setUser(userData);
  const logout = () => {
    StorageService.setCurrentUser(null);
    setUser(null);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, user, login, logout }}>
      <HashRouter>
        <ScrollToTop />
        <div className="font-sans antialiased text-gray-800 bg-white min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow bg-[url('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-fixed bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
            <div className="relative z-10 min-h-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login />} /> {/* Reusing Login for simplicity in this demo */}
                <Route path="/tracking" element={<OrderTracking />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </main>
          
          {/* Expanded Footer */}
          <footer className="bg-royal-dark text-white pt-16 pb-8 border-t-4 border-royal-gold relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                
                {/* Brand Column */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-royal-gold mb-6 tracking-wide">ROYAL BITES</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Elevating fast food to a royal standard. Premium ingredients, exquisite taste, and service fit for a king.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-royal-gold hover:text-white transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-royal-gold hover:text-white transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-royal-gold hover:text-white transition-colors">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
                  <ul className="space-y-3">
                    <li><Link to="/" className="text-gray-400 hover:text-royal-gold transition-colors">Home</Link></li>
                    <li><Link to="/menu" className="text-gray-400 hover:text-royal-gold transition-colors">Our Menu</Link></li>
                    <li><Link to="/about" className="text-gray-400 hover:text-royal-gold transition-colors">Our Story</Link></li>
                    <li><Link to="/tracking" className="text-gray-400 hover:text-royal-gold transition-colors">Track Order</Link></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-gray-400">
                      <MapPin className="text-royal-gold shrink-0 mt-1" size={18} />
                      <span>123 King's Way, Culinary District, New York, NY 10001</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <Phone className="text-royal-gold shrink-0" size={18} />
                      <span>(555) 123-4567</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <Mail className="text-royal-gold shrink-0" size={18} />
                      <span>support@royalbites.com</span>
                    </li>
                  </ul>
                </div>

                {/* Opening Hours */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Opening Hours</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex justify-between border-b border-gray-800 pb-2">
                      <span>Mon - Fri</span>
                      <span className="text-white">10:00 AM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-800 pb-2">
                      <span>Saturday</span>
                      <span className="text-white">10:00 AM - 11:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-800 pb-2">
                      <span>Sunday</span>
                      <span className="text-white">11:00 AM - 9:00 PM</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-500 text-sm text-center md:text-left">
                  &copy; {new Date().getFullYear()} Royal Bites Restaurant. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm text-gray-500">
                  <a href="#" className="hover:text-royal-gold">Privacy Policy</a>
                  <a href="#" className="hover:text-royal-gold">Terms of Service</a>
                  <a href="#" className="hover:text-royal-gold">Cookie Policy</a>
                </div>
              </div>
            </div>
          </footer>
          
          <AIChef />
        </div>
      </HashRouter>
    </CartContext.Provider>
  );
};

export default App;