import React, { useState } from 'react';

function OrderModal({ item, onClose }) {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    quantity: 1,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      itemName: item.name,
      itemPrice: item.price,
      quantity: Number(form.quantity),
      customerName: form.customerName,
      phone: form.phone,
      address: form.address,
      paymentMethod: 'cod',
    };
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch {}
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>&times;</button>
          <div className="modal-success">
            <div className="success-icon">&#10003;</div>
            <h3>Order Placed Successfully!</h3>
            <p>Your order for <strong>{item.name}</strong> (x{form.quantity}) has been placed.</p>
            <p>Total: <strong>${(item.price * form.quantity).toFixed(2)}</strong></p>
            <p className="cod-note">Pay with Cash on Delivery</p>
            <button className="btn-submit" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h3>Order {item.name}</h3>
          <p className="modal-price">${item.price.toFixed(2)} per item</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="customerName" value={form.customerName} onChange={handleChange} required placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="03XX-XXXXXXX" />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} required placeholder="House #, Street, City" rows="3" />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" min="1" max="20" value={form.quantity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-option">
                <input type="radio" checked readOnly /> Cash on Delivery (COD)
              </div>
            </div>
            <div className="order-total">
              <span>Total Amount:</span>
              <strong>${(item.price * form.quantity).toFixed(2)}</strong>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;
