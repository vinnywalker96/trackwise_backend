const express = require('express');
const connection = require('./utils/db');
const mongoose = require('mongoose');

const router = require('./routes/index');

const app = express();

const port = 3001 || process.env.PORT;
app.use(express.json());
app.use(router);
const uri = process.env.DATABASE_URL;
connection(uri);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});