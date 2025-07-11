const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

mongoose.connect('mongodb://localhost:27017/shortnerdb');

app.listen(5000,()=>{
    console.log("My server is running at port 5000");
});
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
});