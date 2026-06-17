import React, { useState, useRef, useEffect } from 'react';
import OrderModal from './OrderModal';

const categoryIcons = {
  appetizers: '🥗',
  mains: '🍽️',
  desserts: '🍰',
  beverages: '🍷',
};

const foodImages = {
  Bruschetta: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
  Calamari: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
  'Stuffed Mushrooms': 'https://images.unsplash.com/photo-1605902711622-cfb43c4437e6?w=400&h=300&fit=crop',
  'Grilled Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  'Ribeye Steak': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
  'Chicken Marsala': 'https://images.unsplash.com/photo-1598103442097-8b74f8e0dff6?w=400&h=300&fit=crop',
  'Pasta Primavera': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop',
  Tiramisu: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
  Cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
  'Chocolate Lava Cake': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
  Espresso: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
  'House Wine': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
  'Craft Cocktail': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
};

function MenuCard({ item, index, onOrder }) {
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * -15, y: x * 15 });
    };

    const handleLeave = () => setTilt({ x: 0, y: 0 });

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="menu-card"
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="card-img">
        {!imgLoaded && <div className="shimmer" />}
        <img
          src={foodImages[item.name]}
          alt={item.name}
          onLoad={() => setImgLoaded(true)}
          className={imgLoaded ? 'loaded' : ''}
        />
        <div className="card-img-overlay">
          <span className="view-label">View Dish</span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-category">{item.category}</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="price-row">
          <div className="price">${item.price.toFixed(2)}</div>
          <button className="order-btn" onClick={() => onOrder(item)}><span>Order Now</span></button>
        </div>
      </div>
    </div>
  );
}

function Menu({ items, categories, activeCategory, setActiveCategory }) {
  const [orderItem, setOrderItem] = useState(null);

  return (
    <>
    {orderItem && <OrderModal item={orderItem} onClose={() => setOrderItem(null)} />}
    <section id="menu" className="section">
      <div className="section-header">
        <span className="section-badge">Our Selection</span>
        <h2 className="section-title">Explore Our Menu</h2>
        <p className="section-subtitle">Crafted with passion, served with pride</p>
      </div>

      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'All Items' : cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {items.map((item, index) => (
          <MenuCard key={item._id} item={item} index={index} onOrder={setOrderItem} />
        ))}
      </div>
    </section>
    </>
  );
}

export default Menu;
