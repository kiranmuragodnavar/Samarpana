const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./dbb/conn');
const User = require('./model/userschema')
const PORT = process.env.PORT;
app.use(express.json());
const cookieParser=require("cookie-parser");
app.use(cookieParser())

app.use(require('./router/auth'));
app.get('/', (req, res) => {
    res.send("Hello World");
});

// app.get('/contact', (req, res) => {
//     res.send("Hello World 2");
//     res.cookie("Test","Kiran");
// });

// app.get('/about', (req, res) => {
//     res.send("Hello World 3");
// });

app.listen(3000, () => {
    console.log("Server is running")
})
