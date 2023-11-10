const express = require("express");
const connection = require("./utils/db");

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.DATABASE_URL;
connection(uri);

app.get("/", (req, res) => res.status(200).send("Hello World!"));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

