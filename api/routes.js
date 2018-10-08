const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
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

router.post("/send-mail", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yml.code@gmail.com",
      pass: "ymlcode123"
    }
  });

  let mailOptions = {
    from: "yml.code@gmail.com",
    to: req.body.mailList,
    subject: "Sending Email using Node.js",
    text: "That was easy!"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
