const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'ec2-3-131-157-19.us-east-2.compute.amazonaws.com',
    user: 'admin',
    password: 'VandyIceHockey',
    database: 'vandy_ride_share', // Replace with your actual database name if different
    port: 3306
});


// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Test endpoint to fetch all data from a table named 'your_table_name'
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM User'; // Replace 'your_table_name' with your actual table name

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Endpoint to fetch user details by user id
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM User WHERE id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length == 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(results[0]);
    });
});

// Endpoint to update user details
app.put('/user/:id', (req, res) => {
    const userId = req.params.id;

    const {
        name,
        mobile_number,
        address_id,
        email,
        has_car,
        car_capacity,
        car_build
    } = req.body;

    const sql = `
        UPDATE User SET 
            name = ?, 
            mobile_number = ?, 
            address_id = ?, 
            email = ?, 
            has_car = ?, 
            car_capacity = ?, 
            car_build = ?
        WHERE id = ?
    `;

    db.query(sql, [name, mobile_number, address_id, email, has_car, car_capacity, car_build, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.affectedRows == 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully!' });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
