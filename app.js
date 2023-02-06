const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth_routes')
const cookieParser = require('cookie-parser')

const app = express();

//SETTING UP STATIC FILES
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//SETTING UP VIEW ENGINE/ TEMPLATING ENGINE
app.set('view engine', 'ejs');

//DATABASE CONNECTION
mongoose.set('strictQuery', true);

const dbURI = 'mongodb+srv://sujeet:sujeet123@cluster0.4ehdu91.mongodb.net/node-auth'

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true,})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))

//SETTING UP ROUTES
app.get('/', (req, resp) => {
    resp.render('home');
});

app.get('/products', (req, resp) => {
    resp.render('products');
});

app.use(authRoutes);


//COOKIES SETUP

// app.get('/set-cookies',(req, resp)=>{
//     // resp.setHeader('Set-Cookie', 'newUser = true'); --- to use cookie without cookie-parser module

//     resp.cookie('newUser', false);
//     // resp.cookie('isEmployee', true,{maxAge: 1000, secure: true}); --- cookies gets sent to https connection only and is for deployment 
//     resp.cookie('newEmp', true, {maxAge: 1000*60*60, httpOnly: true})
//     // cookies gets sent to http connection only hence good for development only due to local server
//     resp.send('you got cookies')
// })


// app.get('/read-cookies', (req, resp)=>{
//     const cookies = req.cookies;
//     console.log(cookies)

//     resp.json(cookies)
// })