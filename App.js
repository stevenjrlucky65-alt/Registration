import React, { useState, useEffect } from 'react';

function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: '', room: '' });

  // Load existing bookings from API
  useEffect(() => {
    fetch('/api/server').then(res => res.json()).then(data => setBookings(data));
  }, []);

  const handleCheckIn = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/server', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const updatedData = await res.json();
    setBookings(updatedData);
    setForm({ name: '', room: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🏨 Hotel Management System</h1>
      
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>Check-In Guest</h3>
        <form onSubmit={handleCheckIn} style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Guest Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{padding: '8px', flex: 2}} />
          <input placeholder="Room #" value={form.room} onChange={e => setForm({...form, room: e.target.value})} required style={{padding: '8px', flex: 1}} />
          <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Check In</button>
        </form>
      </div>

      <table style={{ width: '100%', marginTop: '30px', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#343a40', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Guest Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Room Number</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{b.name}</td>
              <td style={{ padding: '12px' }}>{b.room}</td>
              <td style={{ padding: '12px' }}><span style={{ color: 'green' }}>● Active</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
