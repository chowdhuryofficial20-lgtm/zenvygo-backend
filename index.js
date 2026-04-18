const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// CORS কনফিগারেশন - এটি তোমার ওয়েবসাইটকে ডাটা নেওয়ার অনুমতি দেবে
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Database Connection
const mongoURI = "mongodb+srv://Admin:MdAsifulIslam9901@zenvygo.4munqqp.mongodb.net/?appName=Zenvygo"; 

mongoose.connect(mongoURI)
    .then(() => console.log("Zenvygo Database Connected"))
    .catch(err => console.log("Database Connection Error:", err));

// Product Model
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    category: String,
    description: String
}));

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Product Added Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error adding product" });
    }
});

app.get('/', (req, res) => {
    res.send("Zenvygo Backend Server is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
