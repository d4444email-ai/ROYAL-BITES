import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent pt-8">
      {/* Hero Header - Styled like Home Promo Banner */}
      <div className="px-4 mb-12">
        <div className="max-w-5xl mx-auto bg-royal-red text-white shadow-2xl relative z-10 rounded-3xl py-16 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-sm">Our Royal Story</h1>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto font-light tracking-wide">
            Defining the gold standard of fast food since 1995.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-royal-gold/20 rounded-full z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" 
                alt="Restaurant Interior" 
                className="relative z-10 rounded-lg shadow-2xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-royal-red/10 rounded-full z-0"></div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-royal-dark">Founded in Excellence</h2>
              <div className="w-16 h-1 bg-royal-gold"></div>
              
              <p className="text-gray-600 leading-relaxed">
                At Royal Bites, we believe that fast food should be a regal experience. Established in 1995, our journey began with a simple vision: to elevate everyday favorites into culinary masterpieces without sacrificing speed or convenience.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                We pride ourselves on using only the finest ingredients. Our beef is 100% premium angus, our vegetables are sourced fresh daily, and our signature sauces are crafted in-house by expert chefs.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-royal-gold mt-6">
                <p className="italic text-gray-700 font-medium">
                  "To serve every guest like royalty, providing not just a meal, but a memorable dining experience."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;