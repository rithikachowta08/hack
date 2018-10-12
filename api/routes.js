const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// takes input as template string. prepares data to deliver to api

callJdoodleApi = userScript => {
  request(
    {
      url: "https://api.jdoodle.com/execute",
      method: "POST",
      json: {
        clientId: "eaf5d02e0106c43d533594b300366743",
        clientSecret:
          "6faab0531e48a67cedc676a7baeb1bfae1e30f8abdd8510c593a94a97c6fceeb",
        script: userScript,
        stdin: "3\naaaabccc\naabbcc\nppppmmnnoooopp",
        language: "c",
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

// Extract jwt from auth field in header

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

router.post("/login", (req, res) => {
  console.log("login endpoint hit");
  jwt.sign({ userId: req.body.userId }, "hacker-secret", (err, token) => {
    res.json({ token });
    if (err) {
      res.send({ errorMsg: err });
    }
  });
});

// protected route to dashboard

router.post("/dashboard", verifyToken, (req, res) => {
  console.log("call to dashboard");
  jwt.verify(req.token, "hacker-secret", (err, autoData) => {
    if (err) {
      res.sendStatus(403);
      res.json({ msg: "forbidden" });
    } else {
      res.sendStatus(200);
      res.json({
        message: "authorized",
        authData: autoData
      });
    }
  });
});

module.exports = router;
