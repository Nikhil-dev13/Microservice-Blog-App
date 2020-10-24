const express = require("express");
const cors = require("cors");
const bodyParser = require("bosy-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());
