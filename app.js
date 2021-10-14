const express = require('express');
const mongoose = require('mongoose');
const {PORT, DBURL} = require('./config/defalut.json')

const shopRoute = require('./routes/shopRoute');
const productRoute = require('./routes/productRoute');


const app = express();

app.use(express.json())
app.use(express.static('uploads'))

app.listen(PORT, ()=>console.log("Server started"+ PORT));

mongoose.connect(DBURL,{useUnifiedTopology:true, useNewUrlParser: true ,useCreateIndex:true},()=>{
    console.log("Data base Connected");

})

app.use(shopRoute);
app.use(productRoute);