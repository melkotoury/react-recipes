const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const Recipe = require('./models/Recipe');
const User = require('./models/User');

// connects to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

// Initializes application

const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});