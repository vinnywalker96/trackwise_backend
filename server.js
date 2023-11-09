const express = require('express');
const connection = require('./utils/db');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');
const serverless = require('serverless-http');

const app = express();

const port = 3001 || process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(router);
const uri = process.env.DATABASE_URL;
connection(uri);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports.handler = serverless(app);