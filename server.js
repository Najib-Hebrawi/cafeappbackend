
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


const hostname = 'localhost';
const port = 3000;

app.get('/', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello From serverrrrrrrr')
})
app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
 */