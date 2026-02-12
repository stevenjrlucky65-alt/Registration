const express = require('express');
const app = express();
app.use(express.json());

// Temporary data (will reset on deploy/sleep)
let hotelDatabase = [
  { name: "John Wick", room: "101" },
  { name: "Sherlock Holmes", room: "221B" }
];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(hotelDatabase);
  } else if (req.method === 'POST') {
    const { name, room } = req.body;
    hotelDatabase.push({ name, room });
    res.status(201).json(hotelDatabase);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
