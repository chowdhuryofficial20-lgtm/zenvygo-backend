require('dotenv').config(); // এটি .env ফাইল পড়তে সাহায্য করে
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// সরাসরি লিঙ্ক না দিয়ে .env থেকে কল করা হচ্ছে
const mongoURI = process.env.MONGO_URI; 

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

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.get('/', (req, res) => res.send("Zenvygo Backend is Running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
