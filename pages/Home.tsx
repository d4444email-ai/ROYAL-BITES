import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Zap } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { CartContext } from '../App';

const Home: React.FC = () => {
  // Increased slice to 9 to show more popular items on home page
  const featuredProducts = StorageService.getProducts().filter(p => p.isPopular).slice(0, 9);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = (product: any) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-royal-gold drop-shadow-lg">
            Taste the Royalty
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light tracking-wider">
            Premium ingredients, exquisite flavors, served with elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/menu" 
              className="bg-royal-gold text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              View Full Menu <ArrowRight size={20} />
            </Link>
            <Link 
              to="/about" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-royal-red transition duration-300 shadow-lg"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-dark mb-4">Royal Favorites</h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Curated selections fit for a king.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-royal-gold text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} fill="white" /> POPULAR
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-royal-dark group-hover:text-royal-red transition">{product.name}</h3>
                    <span className="text-xl font-serif font-bold text-black">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">{product.description}</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 border border-royal-dark text-royal-dark font-bold py-2 rounded hover:bg-royal-dark hover:text-white transition duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Add
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-royal-red text-white font-bold py-2 rounded hover:bg-red-800 transition duration-300 flex items-center justify-center gap-2"
                    >
                      <Zap size={16} fill="currentColor" /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner - Reduced Width */}
      <div className="px-4 pb-16">
        <section className="max-w-5xl mx-auto bg-royal-red text-white shadow-2xl relative z-10 rounded-3xl py-12 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Hungry for more?</h2>
          <p className="text-lg mb-8 opacity-90">Join our loyalty program and get 20% off your first Royal Feast.</p>
          <Link to="/signup" className="inline-block bg-royal-gold text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-royal-gold transition shadow-lg">
            Sign Up Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;