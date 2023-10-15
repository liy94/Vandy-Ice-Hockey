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

app.put('/users/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const updatedUser = await collection.findOneAndUpdate({ _id: userId }, { $set: req.body });
        if (!updatedUser) return res.status(404).send('User not found');
        res.status(200).json({ message: "Document updated successfully", data: updatedDocument });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/users', async (req, res) => {
    try {
        // Assuming auto-increment functionality for id is handled by your MongoDB setup.
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
