
import { createServer } from 'http';

const hostname = 'localhost';
const port = 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello From server');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});






/*
 const express= require('express');

const app = express();

// here we define a hostname and port, in our case they should be our server.
const hostname = 'localhost';
const port = 3000;


// here we define a route.
// here indside the route we should have a list of ( products in our project (crepe cafe)) from  database and return them.
app.get('/', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello From serverrrrrrrr')
})


// here is an another route for menu and it should return a JSON objekt of produkts.
app.get('/api/crepecafe-menu', (req,res) => {
    res.statusCode = 200;
    res.send(//some object//);
    
  
})


app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
 */