export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Pizza' | 'Burger' | 'Sides' | 'Drinks' | 'Dessert';
  image: string;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Delivered';
  date: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};
