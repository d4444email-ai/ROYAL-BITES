import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Double Royal Burger',
    description: 'Two premium beef patties, melted cheddar, pickles, onions, and signature sauce on a toasted sesame bun.',
    price: 16.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '2',
    name: 'Spicy Chicken Deluxe',
    description: 'Crispy fried chicken breast, spicy mayo, lettuce, and pepper jack cheese.',
    price: 14.50,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '3',
    name: 'Pepperoni Lover\'s Pizza',
    description: 'Loaded with double pepperoni and extra mozzarella cheese on a hand-tossed crust.',
    price: 18.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '4',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with american cheese, ketchup, mustard, and pickles.',
    price: 11.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '5',
    name: 'BBQ Bacon Stack',
    description: 'Beef patty topped with crispy bacon, onion rings, and smoky BBQ sauce.',
    price: 15.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '6',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce, fresh mozzarella, basil, and olive oil.',
    price: 15.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '7',
    name: 'Supreme Pizza',
    description: 'Sausage, pepperoni, peppers, onions, and mushrooms.',
    price: 19.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '9',
    name: 'Loaded Cheese Fries',
    description: 'Fries topped with melted cheddar, bacon bits, and scallions.',
    price: 8.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '10',
    name: 'Onion Rings',
    description: 'Thick-cut onion rings battered and fried to perfection.',
    price: 6.99,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '12',
    name: 'Strawberry Milkshake',
    description: 'Rich and creamy strawberry shake topped with whipped cream.',
    price: 6.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: '13',
    name: 'Classic Cola',
    description: 'Ice-cold cola.',
    price: 2.99,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '14',
    name: 'Chocolate Sundae',
    description: 'Soft serve vanilla ice cream with hot chocolate fudge.',
    price: 5.99,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  }
];

export const CATEGORIES = ['All', 'Pizza', 'Burger', 'Sides', 'Drinks', 'Dessert'];