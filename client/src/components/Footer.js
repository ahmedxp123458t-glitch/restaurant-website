import React from 'react';

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-grid">
        <div>
          <h3>La Maison</h3>
          <p>Experience fine dining at its finest. Our passion is creating memorable meals with the freshest ingredients.</p>
        </div>
        <div>
          <h3>Hours</h3>
          <p>Mon–Thu: 5pm – 10pm</p>
          <p>Fri–Sat: 5pm – 11pm</p>
          <p>Sun: 10am – 9pm</p>
        </div>
        <div>
          <h3>Contact</h3>
          <p>123 Gourmet Street, New York, NY 10012</p>
          <p>(212) 555-0199</p>
          <p>info@lamaison.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} La Maison. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
