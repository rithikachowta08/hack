const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

callJdoodle = () => {
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

// Get auth header value
verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

// login endpoint - grant jwt to client
app.post("/sessionLogin", (req, res) => {
  console.log("session login endpoint hit");
  jwt.sign({ userId: req.body.userId }, "hacker-secret", (err, token) => {
    res.json({ token });
    if (err) {
      res.send({ errorMsg: err });
    }
  });
});

app.post("/dashboard", verifyToken, (req, res) => {
  jwt.verify(req.token, "hacker-secret", (err, autoData) => {
    if (err) {
      res.sendStatus(403);
      res.json({ msg: "forbidden", status: 403 });
    } else {
      res.json({
        message: "jwt working",
        authData: autoData
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
