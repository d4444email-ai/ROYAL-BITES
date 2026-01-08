import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Package, ShoppingBag, X } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Product, Order } from '../types';
import { CartContext } from '../App';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const { user } = useContext(CartContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Product Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', price: 0, description: '', category: 'Burger', image: 'https://picsum.photos/400/300'
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    refreshData();
  }, [user, navigate]);

  const refreshData = () => {
    setProducts(StorageService.getProducts());
    setOrders(StorageService.getOrders());
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product?')) {
      StorageService.deleteProduct(id);
      refreshData();
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: editingProduct ? editingProduct.id : Math.random().toString(36).substr(2, 9),
      name: formData.name!,
      price: Number(formData.price),
      description: formData.description!,
      category: formData.category as any,
      image: formData.image!,
      isPopular: false
    };

    StorageService.saveProduct(product);
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: 0, description: '', category: 'Burger', image: 'https://picsum.photos/400/300' });
    refreshData();
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setFormData(p);
    setIsModalOpen(true);
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    StorageService.updateOrderStatus(orderId, status);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Admin Dashboard</h1>
          <div className="bg-white/95 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-gray-200 flex">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'products' ? 'bg-royal-gold text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'orders' ? 'bg-royal-gold text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Orders
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Package size={20} /> Product Inventory
              </h2>
              <button 
                onClick={() => { setEditingProduct(null); setFormData({ name: '', price: 0, description: '', category: 'Burger', image: 'https://picsum.photos/400/300' }); setIsModalOpen(true); }}
                className="bg-royal-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 flex items-center gap-2"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-gray-800">{p.name}</div>
                            <div className="text-xs text-gray-400">{p.description.substring(0, 30)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{p.category}</td>
                      <td className="px-6 py-4 font-bold text-royal-gold">${p.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleEditClick(p)} className="text-blue-500 hover:text-blue-700 mr-3"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag size={20} /> Customer Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Items</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-xs font-bold">{o.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{o.customerName}</td>
                      <td className="px-6 py-4 font-bold text-royal-gold">${o.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-full border-none focus:ring-0 cursor-pointer ${
                            o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            o.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                            o.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {o.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-royal-dark text-white">
                <h3 className="font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
              </div>
              <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full border rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full border rounded-md px-3 py-2">
                      {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-md px-3 py-2 h-24"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border rounded-md px-3 py-2" />
                </div>
                <button type="submit" className="w-full bg-royal-gold text-white py-3 rounded-md font-bold hover:bg-yellow-600 transition">Save Product</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;