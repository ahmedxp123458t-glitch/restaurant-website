import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Footer from './components/Footer';
import './App.css';

const fallbackMenu = [
  { _id: '1', name: 'Bruschetta', description: 'Grilled bread with tomato, basil, and mozzarella', price: 9.99, category: 'appetizers' },
  { _id: '2', name: 'Calamari', description: 'Crispy fried squid with marinara sauce', price: 12.99, category: 'appetizers' },
  { _id: '3', name: 'Stuffed Mushrooms', description: 'Mushrooms filled with herb cream cheese', price: 10.99, category: 'appetizers' },
  { _id: '4', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 24.99, category: 'mains' },
  { _id: '5', name: 'Ribeye Steak', description: '12oz ribeye with mashed potatoes and asparagus', price: 32.99, category: 'mains' },
  { _id: '6', name: 'Chicken Marsala', description: 'Pan-seared chicken in marsala wine sauce', price: 19.99, category: 'mains' },
  { _id: '7', name: 'Pasta Primavera', description: 'Seasonal vegetables in garlic olive oil', price: 16.99, category: 'mains' },
  { _id: '8', name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 8.99, category: 'desserts' },
  { _id: '9', name: 'Cheesecake', description: 'New York style with berry compote', price: 9.99, category: 'desserts' },
  { _id: '10', name: 'Chocolate Lava Cake', description: 'Warm cake with molten chocolate center', price: 10.99, category: 'desserts' },
  { _id: '11', name: 'Espresso', description: 'Double shot of premium espresso', price: 3.99, category: 'beverages' },
  { _id: '12', name: 'House Wine', description: 'Glass of red or white house wine', price: 7.99, category: 'beverages' },
  { _id: '13', name: 'Craft Cocktail', description: 'Seasonal handcrafted cocktail', price: 12.99, category: 'beverages' },
];

function App() {
  const [menuItems, setMenuItems] = useState(fallbackMenu);
  const [activeCategory, setActiveCategory] = useState('all');
  const [apiFailed, setApiFailed] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => { if (data.length) setMenuItems(data); })
      .catch(() => setApiFailed(true));
  }, []);

  const categories = ['all', 'appetizers', 'mains', 'desserts', 'beverages'];
  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Menu
        items={filteredItems}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Reservation />
      <Footer />
    </div>
  );
}

export default App;
