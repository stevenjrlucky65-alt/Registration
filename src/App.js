import React, { useState, useEffect } from 'react';

function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: '', room: '' });

  // Load existing bookings from the backend
  useEffect(() => {
    fetch('/api/server')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.log("Error fetching:", err));
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
    <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🏨 Hotel Management Pro</h1>
      
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h3>New Guest Check-In</h3>
        <form onSubmit={handleCheckIn} style={{ display: 'flex', gap: '10px' }}>
          <input 
            placeholder="Guest Name" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            required 
            style={{padding: '10px', flex: 2, borderRadius: '4px', border: '1px solid #ccc'}} 
          />
          <input 
            placeholder="Room #" 
            value={form.room} 
            onChange={e => setForm({...form, room: e.target.value})} 
            required 
            style={{padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc'}} 
          />
          <button type="submit" style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
            Check In
          </button>
        </form>
      </div>

      <h3 style={{ marginTop: '40px' }}>Current Occupancy</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ background: '#34495e', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Guest</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Room</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{b.name}</td>
              <td style={{ padding: '12px' }}>{b.room}</td>
              <td style={{ padding: '12px' }}><span style={{ color: '#27ae60' }}>● Occupied</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
