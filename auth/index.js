const express = require('express');

const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

// Import DB
mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true },
()=> console.log('Connected to DataBase'))


//Middleware
app.use(express.json())
// server.js or app.js

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//Import Routes
const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/users',function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }
  ,authRoute);

PORT = 3000 || process.env.PORT;

app.listen(PORT, ()=> console.log('Up and running'));