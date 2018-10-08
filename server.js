const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const api = require("./api/routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", api);

callJdoodleApi = () => {
  request(
    {
      url: "https://api.jdoodle.com/execute",
      method: "POST",
      json: {
        clientId: "eaf5d02e0106c43d533594b300366743",
        clientSecret:
          "6faab0531e48a67cedc676a7baeb1bfae1e30f8abdd8510c593a94a97c6fceeb",
        script: "print('hello')",
        language: "python3",
        versionIndex: "0"
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.send(body);
      }
    }
  );
};

app.listen(port, () => console.log(`Listening on port ${port}`));
