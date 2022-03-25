 const express= require('express');
 const app = express();
 app.use(express.json()); // to convert from json.
 app.use(express.urlencoded({extended:true}));
 const dotenv =require('dotenv');
 const mongoose = require('mongoose'); // import mongoose.
 const data = require('./model/data'); // import data.js
 const Joi = require('Joi');//define a Joi, if we need to use it in the future
let { products } = require('./model/data');
const { equal } = require('Joi');
 dotenv.config();// we can set an enviroment variable by exexuting (export command) for mac, and (set command) for windows.
 


// adding some references:
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
// https://www.youtube.com/watch?v=5WFyhsnU4Ik
// https://www.youtube.com/watch?v=pKd0Rpw7O48
//https://www.youtube.com/watch?v=x4zNO6iK0PQ&list=PLgWjD_CBfh0ACkCyg5Kjk0mh2Mcc-sZa3&index=8


const hostname = process.env.HOST;
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, {});



// here we define a route to chake that api is working, apen in lokalhost.
app.get('/', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello From server');
});

// show the categories.
app.get('/api/categories' , (req, res) => {
res.send(data.categories);
});

// add products to mongodb
let Product = mongoose.model(
    'products', 
    new mongoose.Schema ({
        name:String, 
        description:String,
        price:Number,
        category:String,
    })
);
// fetch the products from products Array.
app.get('/api/products/seed', async (req, res) => {
    const products = await Product.insertMany(data.products);
    res.send({products}); 
});

// fetch the products from the categories.
app.get('/api/products',async (req,res) =>{
const {category} = req.query;
const products = await Product.find (category ? {category} : {}); // return the products in this category, or return all products.
res.send(products);
} );

// get product by ID.
app.get('/api/products/:id',async (req,res) => {
    const _id = req.params.id;
    Product.findById(_id)
    .exec()
    .then(result => {
    console.log(result);
    res.json({
    product:result,
    message:"product find"})})
    .catch(err => {
    res.status(500).json({
    error: err,
     message:'product does not finded, no such as this id...'})})
});


// post a new product to products.
app.post('/api/products' , async (req,res) =>{
const product = new Product({
    _id: new mongoose.Types.ObjectId,
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category
})
product.save()
.then(result =>{
    console.log(result);
    res.status(200).json({
        newProduct:result,
    })
})
.catch(err =>{
    console.log(err);
    res.status(500).json({
        error: err
    })
})
});

// delete a product from products.
app.delete('/api/products/:id' , async (req,res) =>{
Product.deleteOne({_id:req.params.id})
.then(result => {
    res.status(200).json({
        message:'product deleted',
        result:result})})
.catch(err => {
    res.status(500).json({
        error: err,
        message:'product does not deleted, no such as this id...'})})
});


// (put a product)=(update product).
app.put('/api/products/:id', async (req,res) =>{
console.log(req.params.id);
Product.findOneAndUpdate({_id:req.params.id},{
    $set:{
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category
    }
})
.then(result =>{
    res.status(200).json({
        updatedProduct:result
    })
})
.catch(err =>{
    console.log(err);
    res.status(500).json({
        error: err
    })

})
});




app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});