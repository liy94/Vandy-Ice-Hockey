const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const uri = "mongodb+srv://PrinciplesSWE:VandyIceHockey@danielblog.te9b5na.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let client;
let collection;

MongoClient.connect(uri)
    .then(_client => {
        client = _client;
        console.log('Connected to MongoDB successfully.');
        const database = client.db("VandyIceHockey");
        collection = database.collection("Users");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
    });

// GET /users/:id
// This endpoint retrieves a user from the Users collection by ID.
// @params id: The ID of the user to retrieve.
// Response:
// 200 OK: The user data in JSON format.
// 404 Not Found: If the user with the specified ID does not exist.
// 500 Internal Server Error: If an error occurs while retrieving the user.
app.get('/users/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); // Convert string to ObjectId
        const user = await collection.findOne({ _id: userId });
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// PUT /users/:id
// This endpoint updates a user in the Users collection by ID.
// @params id: The ID of the user to update.
// Request Body:
// name: The updated name of the user.
// email: The updated email address of the user.
// Response:
// 200 OK: The updated user data in JSON format.
// 404 Not Found: If the user with the specified ID does not exist.
// 500 Internal Server Error: If an error occurs while updating the user.
app.put('/users/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const updatedUser = await collection.findOneAndUpdate({ _id: userId }, { $set: req.body });
        if (!updatedUser) return res.status(404).send('User not found');
        res.status(200).json({ message: "Document updated successfully", data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// POST /users
// This endpoint creates a new user in the Users collection.
// Request Body:
// name: The name of the user.
// email: The email address of the user.
// Response:
// 201 Created: The newly created user data in JSON format.
// 500 Internal Server Error: If an error occurs while creating the user.
app.post('/users', async (req, res) => {
    try {
        const newUser = await collection.insertOne(req.body);
        res.status(201).send(newUser.ops[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    if (client) {
        client.close();
    }
    process.exit();
});
