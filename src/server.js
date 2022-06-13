require("dotenv").config();
const express = require("express");
const routes = require("./routes.js");
const cors = require("cors");
require('./database/index')


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);

console.log(`[INFO] Iniciado`);
console.log(`[INFO] Porta: ${process.env.PORT} `);
