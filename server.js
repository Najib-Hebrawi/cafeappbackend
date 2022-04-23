const express = require('express');
const app = express();
const brcypt = require('bcrypt');






// we store our users in a local variable inside our server. (is something you would never want to do in production, but it is easy for os).
// every time we save our app and reloads this variable users is going to get reset to an empty array, 
//so every time we make a change we nedd to re add our user
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