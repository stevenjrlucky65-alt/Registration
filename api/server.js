const express = require('express');
const app = express();
app.use(express.json());

// Temporary storage (Resets when Vercel goes to sleep)
let bookings = [
  { name: "John Wick", room: "101" },
  { name: "Sherlock Holmes", room: "221B" }
];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    const { name, room } = req.body;
    bookings.push({ name, room });
    res.status(201).json(bookings);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
