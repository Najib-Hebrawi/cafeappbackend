
/*import { createServer } from 'http';
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
*/







 const express= require('express');
 const app = express();
 
 // config method is the one thats going off and read our enviromental variables file and save all those variables.
 // so when this script runs it will have access to all of those through somethings called (process.env).
 // and we need to create a file saving the variables.
 // we can set an enviroment variable by exexuting (export command) for mac, and (set command) for windows.
 require('dotenv').config();
 //{path: path/filename}
 


 // here we define a hostname and port, in our case they should be our server.
const hostname = process.env.HOST;
const port = process.env.PORT;


// here we define a route.
// here indside the route we should have a list of ( products in our project (crepe cafe)) from  database and return them.
app.get('/', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello From server');
});


// here is an another route for menu and it should return a JSON objekt of produkts.
// for example we can move all the route related to menu to a separate file like menu.js.
app.get('/api/crepecafe-menu', (req,res) => {
    res.statusCode = 200;
    res.send(); // here we can have some object.
    
});




app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});