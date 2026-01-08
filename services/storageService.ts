import { Product, Order, User } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const KEYS = {
  PRODUCTS: 'royal_products_v6', // Updated key to refresh product list
  ORDERS: 'royal_orders',
  USER: 'royal_user', // Session simulation
};

// Initialize DB
if (!localStorage.getItem(KEYS.PRODUCTS)) {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
}
if (!localStorage.getItem(KEYS.ORDERS)) {
  localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
}

export const StorageService = {
  getProducts: (): Product[] => {
    return JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
  },

  saveProduct: (product: Product): void => {
    const products = StorageService.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct: (id: string): void => {
    const products = StorageService.getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getOrders: (): Order[] => {
    return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
  },

  saveOrder: (order: Order): void => {
    const orders = StorageService.getOrders();
    orders.unshift(order); // Newest first
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  updateOrderStatus: (id: string, status: Order['status']): void => {
    const orders = StorageService.getOrders();
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    }
  },

  // Mock User Session
  getCurrentUser: (): User | null => {
    const u = localStorage.getItem(KEYS.USER);
    return u ? JSON.parse(u) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.USER);
    }
  }
};