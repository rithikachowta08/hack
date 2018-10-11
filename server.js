const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
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

app.post("/execute", (req, res) => {
  var fileContent = req.body.script;
  var filepath = "user-script.py";

  fs.writeFile(filepath, fileContent, err => {
    if (err) throw err;
    console.log("The file was succesfully saved!");
    cmd.get("python user-script.py", function(err, data, stderr) {
      if (!err) {
        console.log("data from python script " + data);
      } else {
        console.log("python script cmd error: " + err);
      }
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
