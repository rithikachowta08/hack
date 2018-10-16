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

// python
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

var nodemailer = require("nodemailer");
var smtp = require("nodemailer-smtp-transport");

app.use(smtp);

// Create a SMTP transport object
var transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "yml.code@gmail.com",
    pass: "rithi@123"
  }
});

var message = {
  from: "yml.code@gmail.com",
  to: "rithzcool@gmail.com",

  subject: "tester",

  text: "testbody"
};

console.log("Sending Mail");
transport.sendMail(message, function(error) {
  if (error) {
    console.log("Error occurred");
    console.log(error.message);
    return;
  }
  console.log("Message sent successfully!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
