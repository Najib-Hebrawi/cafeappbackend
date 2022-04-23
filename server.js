const express = require('express');
const app = express();



// we store our users in a local variable inside our server. (is something you would never want to do in production, but it is easy for os)
const users =[]

app.set('view-engine', 'ejs');

// that telling our application that what we want to do is take these forms from
// our email and password and we want to be able to access them inside of our request variable inside of our post method.
app.use(express.urlencoded({extended: false}));



app.get('/' , (req, res) =>{
res.render('index.ejs')
});






app.get('/login', (req, res) =>{
    res.render('login.ejs')

});
app.post('/login', (req,res) =>{

});






app.get('/register', (req, res) =>{
    res.render('register.ejs')

});
app.post('/register', (req,res) =>{
    req.body.email

});






app.listen(3000);