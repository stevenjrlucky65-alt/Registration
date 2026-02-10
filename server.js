const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

// Temporary "database" (In a real app, use MongoDB or SQL)
const users = [];

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = { username, password: hashedPassword };
        users.push(newUser);
        
        console.log("User registered:", username);
        res.status(201).send({ message: "User registered successfully!" });
    } catch {
        res.status(500).send({ message: "Error registering user" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
