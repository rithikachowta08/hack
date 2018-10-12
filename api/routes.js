const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("request");
const router = express.Router();

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

// run user submitted code
router.post("/run", (req, res) => {
  console.log("run endpoint hit");
  request(
    {
      url: "https://api.jdoodle.com/execute",
      method: "POST",
      json: {
        clientId: "eaf5d02e0106c43d533594b300366743",
        clientSecret:
          "6faab0531e48a67cedc676a7baeb1bfae1e30f8abdd8510c593a94a97c6fceeb",
        script: req.body.code,
        stdin: req.body.sampleInput,
        language: req.body.language,
        versionIndex: "0"
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.json({ body });
      }
    }
  );
});

module.exports = router;
