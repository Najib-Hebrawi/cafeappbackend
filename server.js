 const express= require('express');
 const app = express();
 const mongoose = require('mongoose'); // import mongoose.
 const data = require('./model/data'); // import data.js
 const Joi = require('Joi');//define a Joi, if we need to use it in the future
 require('dotenv').config();// we can set an enviroment variable by exexuting (export command) for mac, and (set command) for windows.
 


// adding some references:
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
// https://www.youtube.com/watch?v=5WFyhsnU4Ik
// https://www.youtube.com/watch?v=pKd0Rpw7O48


const hostname = process.env.HOST;
const port = process.env.PORT || 3000;

// here we define a route to chake that api is working.
app.get('/', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello From server');
});




// here is an another route for menu and it should return a JSON objekt of produkts.
app.get('/api/categories', (req,res) => {
    res.send(data.categories); // here we can have some object. 
});







app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});