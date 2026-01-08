import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChefHat } from 'lucide-react';
import { getChefRecommendation } from '../services/geminiService';
import { StorageService } from '../services/storageService';

const AIChef: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Bonjour! I am the Royal Chef. Can I recommend a dish for you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const products = StorageService.getProducts();
    const response = await getChefRecommendation(userMsg, products);

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-royal-gold text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          <ChefHat size={28} />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-royal-gold/20 animate-fade-in-up" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-royal-dark text-royal-gold p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChefHat size={20} />
              <h3 className="font-serif font-bold">Royal Chef</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-sm max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-royal-red text-white ml-auto rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 mr-auto rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-400 italic ml-2">Chef is thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for recommendations..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-royal-gold"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-royal-gold text-white p-2 rounded-md hover:bg-yellow-600 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChef;
