const mongoose = require('mongoose');
require('dotenv').config();

function connection(uri){
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

}

module.exports = connection;