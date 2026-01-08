import React, { useState, useContext, useEffect } from 'react';
import { ShoppingCart, Filter, Search, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { Product } from '../types';
import { CartContext } from '../App';
import { CATEGORIES } from '../constants';

const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(StorageService.getProducts());
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-transparent pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl shadow-xl mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Categories */}
            <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-royal-red text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search menu..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-royal-gold focus:ring-1 focus:ring-royal-gold"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col h-full border border-gray-100 transform hover:-translate-y-1">
                <div className="relative h-48">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-royal-dark shadow-sm">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-royal-dark leading-tight">{product.name}</h3>
                    <span className="text-black font-bold font-serif">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-4 flex-1">{product.description}</p>
                  
                  <div className="flex gap-2 mt-auto">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gray-100 text-royal-dark py-2 rounded-lg font-bold text-sm hover:bg-royal-dark hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Add
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-royal-gold text-white py-2 rounded-lg font-bold text-sm hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Zap size={16} fill="currentColor" /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
            <p className="text-xl text-gray-500 font-serif">No royal dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;