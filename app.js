const express = require('express');
const connection = require('./utils/db');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');


const app = express();
const port = 3001 || process.env.PORT;
const uri = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors());
app.use(router);

connection(uri);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
