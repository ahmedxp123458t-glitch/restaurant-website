const mongoose = require('mongoose');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');

const menuItems = [
  { name: 'Bruschetta', description: 'Grilled bread with tomato, basil, and mozzarella', price: 9.99, category: 'appetizers' },
  { name: 'Calamari', description: 'Crispy fried squid with marinara sauce', price: 12.99, category: 'appetizers' },
  { name: 'Stuffed Mushrooms', description: 'Mushrooms filled with herb cream cheese', price: 10.99, category: 'appetizers' },
  { name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 24.99, category: 'mains' },
  { name: 'Ribeye Steak', description: '12oz ribeye with mashed potatoes and asparagus', price: 32.99, category: 'mains' },
  { name: 'Chicken Marsala', description: 'Pan-seared chicken in marsala wine sauce', price: 19.99, category: 'mains' },
  { name: 'Pasta Primavera', description: 'Seasonal vegetables in garlic olive oil', price: 16.99, category: 'mains' },
  { name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 8.99, category: 'desserts' },
  { name: 'Cheesecake', description: 'New York style with berry compote', price: 9.99, category: 'desserts' },
  { name: 'Chocolate Lava Cake', description: 'Warm cake with molten chocolate center', price: 10.99, category: 'desserts' },
  { name: 'Espresso', description: 'Double shot of premium espresso', price: 3.99, category: 'beverages' },
  { name: 'House Wine', description: 'Glass of red or white house wine', price: 7.99, category: 'beverages' },
  { name: 'Craft Cocktail', description: 'Seasonal handcrafted cocktail', price: 12.99, category: 'beverages' },
];

const seed = async () => {
  await connectDB();
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(menuItems);
  console.log('Menu seeded successfully');
  process.exit();
};

seed();
