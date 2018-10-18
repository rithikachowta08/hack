const bodyParser = require("body-parser");
const express = require("express");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const api = require("./api/routes");
const cmd = require("node-cmd");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", api);

app.listen(port, () => console.log(`Listening on port ${port}`));
