 const express= require('express');
 const app = express();
 const dotenv =require('dotenv');
 const mongoose = require('mongoose'); // import mongoose.
 const data = require('./model/data'); // import data.js
 const Joi = require('Joi');//define a Joi, if we need to use it in the future
 dotenv.config();// we can set an enviroment variable by exexuting (export command) for mac, and (set command) for windows.
 


// adding some references:
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
// https://www.youtube.com/watch?v=5WFyhsnU4Ik
// https://www.youtube.com/watch?v=pKd0Rpw7O48


const hostname = process.env.HOST;
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, {});



// here we define a route to chake that api is working.
app.get('/', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello From server');
});



// add products to mongodb
const Product = mongoose.model(
    'products', 
    new mongoose.Schema ({
        name:String, 
        description:String,
        price:Number,
        category:String,
    })
);
app.get('/api/products/seed', async (req, res) => {
    const products = await Product.insertMany(data.products);
    res.send({products}); 
});


// add category to mongodb
const Category = mongoose.model(
    'categories', 
    new mongoose.Schema ({
        name:String,
    })
);
app.get('/api/category', async (req,res) => {
    const categories = await Category.insertMany(data.categories);
    res.send(categories); 
});







app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});