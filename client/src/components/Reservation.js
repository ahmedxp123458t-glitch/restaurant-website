import React, { useState } from 'react';

function Reservation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: 1, notes: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 1, notes: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch {}
  };

  return (
    <section id="reservations" className="section">
      <h2 className="section-title">Make a Reservation</h2>
      <p className="section-subtitle">Book your table for an unforgettable evening</p>

      <form className="reservation-form" onSubmit={handleSubmit}>
        {success && <div className="success">Reservation confirmed! We look forward to serving you.</div>}

        <div className="form-row">
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="number" name="guests" min="1" max="20" value={form.guests} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <textarea name="notes" placeholder="Special requests or dietary restrictions" value={form.notes} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-submit">Confirm Reservation</button>
      </form>
    </section>
  );
}

export default Reservation;
