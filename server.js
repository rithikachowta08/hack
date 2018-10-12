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

preprocessCode = code => {
  code = code.replace(/(\".*)\n(.*\")/g, "$1\\\\n$2"); //escape new line characters
  code = code.replace(/\n/g, "\\n"); //replace line breaks with \n
  code = code.replace(/\s+/g, " ").trim(); // trim white spaces
  code = code.replace(/"/g, '\\"'); // escape double quotes
  console.log(code);
  return code;
};
// login endpoint - grant jwt to client

app.post("/run", (req, res) => {
  console.log("run endpoint hit");
  let formattedCode = preprocessCode(req.body.code);
  callJdoodleApi(formattedCode);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
