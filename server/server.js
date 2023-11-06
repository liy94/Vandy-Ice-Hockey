const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const uri = "mongodb+srv://PrinciplesSWE:VandyIceHockey@danielblog.te9b5na.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');
const app = express();
const PORT = 3001;
app.use(cors());
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
        console.log(req.body)
        const updatedUser = await collection.findOneAndUpdate({ _id: userId }, { $set: req.body });
        if (!updatedUser) return res.status(404).send('User not found');
        res.status(200).json({ message: "Document updated successfully", data: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// GET /users/email/:email
// This endpoint retrieves a user from the Users collection by email.
// @params email: The email of the user to retrieve.
// Response:
// 200 OK: The user data in JSON format.
// 404 Not Found: If the user with the specified email does not exist.
// 400 Bad Request: If the email is not a valid email address.
// 500 Internal Server Error: If an error occurs while retrieving the user.
app.get('/users/email/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;

        // Validate the email address
        // You can use a more robust validation method as required for your use case
        if (!userEmail || !/^\S+@\S+\.\S+$/.test(userEmail)) {
            return res.status(400).send('Invalid email address');
        }

        const user = await collection.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// GET /users
// This endpoint retrieves data about all users from the Users collection.
// Response:
// 200 OK: An array of user data in JSON format.
// 500 Internal Server Error: If an error occurs while retrieving the users.
app.get('/users', async (req, res) => {
    try {
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
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
        res.status(201).send(newUser.insertedId);
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
