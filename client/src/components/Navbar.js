import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">La Maison</a>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reservations">Reservations</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
