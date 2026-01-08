import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { Order } from '../types';
import { CartContext } from '../App';
import { Clock, CheckCircle, ChefHat, Truck } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const userOrders = StorageService.getOrders().filter(o => o.userId === user.id);
    setOrders(userOrders);
  }, [user, navigate]);

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Preparing': return 2;
      case 'Ready': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const config = {
      'Pending': { color: 'bg-gray-100 text-gray-600', icon: Clock },
      'Preparing': { color: 'bg-yellow-100 text-yellow-700', icon: ChefHat },
      'Ready': { color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      'Delivered': { color: 'bg-green-100 text-green-700', icon: Truck },
    }[status];
    
    const Icon = config.icon;

    return (
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
        <Icon size={12} /> {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-white drop-shadow-md mb-8 text-center">Your Order History</h1>
        
        {orders.length === 0 ? (
          <div className="text-center text-gray-200 bg-black/40 backdrop-blur-sm p-6 rounded-lg">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-royal-dark text-white p-4 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-400">Order ID</span>
                    <div className="font-mono font-bold">{order.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Total</div>
                    <div className="font-bold text-royal-gold">${order.total.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Status Bar */}
                  <div className="mb-8 relative">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-500" 
                        style={{ width: `${(getStatusStep(order.status) / 4) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
                      <span className={getStatusStep(order.status) >= 1 ? 'text-green-600 font-bold' : ''}>Placed</span>
                      <span className={getStatusStep(order.status) >= 2 ? 'text-green-600 font-bold' : ''}>Preparing</span>
                      <span className={getStatusStep(order.status) >= 3 ? 'text-green-600 font-bold' : ''}>Ready</span>
                      <span className={getStatusStep(order.status) >= 4 ? 'text-green-600 font-bold' : ''}>Delivered</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.quantity}x {item.name}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;