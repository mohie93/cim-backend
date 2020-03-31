require("dotenv").config();

const express = require("express");
const app = express();
const Dynamo = require("./src/services/db");
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors");

// handle db if exist or not
if (!Dynamo.TableExist()) Dynamo.CreateTable();

// handle json requests
app.use(bodyParser.json());

// handle cors
app.use(cors());

// handle routes
app.use('/slots', require('./src/routes/slot'));

app.listen(port, async () => {
  console.log(`CIM server runs on port: ${port}`);
});
