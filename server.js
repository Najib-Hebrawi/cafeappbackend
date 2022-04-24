
/*
lead in our environment variables.
procution: essentially it means that we are in development.
.config: this is going to lead in all of our different environment variables and set them inside of process.env 
*/
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()}

const express = require('express');
const app = express();
const brcypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport-config');
initializePassport(
    passport,
     email => users.find(user => user.email === email),
     id => users.find(user => user.id === id)
     );







// we store our users in a local variable inside our server. (is something you would never want to do in production, but it is easy for os).
// every time we save our app and reloads this variable users is going to get reset to an empty array, 
//so every time we make a change we nedd to re add our user
const users =[]

app.set('view-engine', 'ejs');

// that telling our application that what we want to do is take these forms from
// our email and password and we want to be able to access them inside of our request variable inside of our post method.
app.use(express.urlencoded({extended: false}));

app.use(flash());
app.use(session({
    // essentially a key tht we want to keep secret which is going to encrypt all of our information for us
    secret: process.env.SESSION_SECRET,
    resave: false, // this says should we resave our session variables if nothing has changed (in our case we do not want to resave it)
    saveUninitialized: false // this saying do you want to save an empty value in the session if there is no value (in our case we do not need to do that)
}));
app.use(passport.initialize()) // this is a funcio inside the passport: is going to set up some of the basics for us
app.use(passport.session()) // to presistes









app.get('/' , (req, res) =>{
res.render('index.ejs', {name: req.user.name})
});






app.get('/login', (req, res) =>{
    res.render('login.ejs')

});

// we use passport.authenticates  middleware
app.post('/login', passport.authenticate('local',{
    // pass it a list of options for things that we want to modify.
successRedirect: '/',  // it is where we go if there is a success 
failureRedirect: '/login', // it is where we go if there is a failure
failureFlash: true // just going to let us have a flash message which we can display to the user wich is going to be equal to our messages in (passport-config.js)
}));






app.get('/register', (req, res) =>{
    res.render('register.ejs')

});
// it should be a async function to use try/catch.
app.post('/register', async (req,res) =>{
    try {
        const hashedPassword = await  brcypt.hash(req.body.password, 10)
        users.push({
            // if we have a database it will automatically generat a ID.
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        // if users.push was successful we want to redirect the user back to the login page,
        // so they can log in with the account they just registered
        res.redirect('/login')
    } catch  {
        // if they failer so
        res.redirect('/register')
    }
    console.log(users);
});






app.listen(3000);