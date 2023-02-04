const express = require('express');
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth_routes')

const app = express();

//SETTING UP STATIC FILES
app.use(express.static('public'));
app.use(express.json())

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
