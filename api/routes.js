const express = require("express");
const request = require("request");
const router = express.Router();

// run user submitted code
router.post("/run", (req, res) => {
  let ip = req.body.sampleInput.replace(/\\n/g, "\n");
  ip = ip.replace(/\"/g, "");
  console.log(ip);
  request(
    {
      url: "https://api.jdoodle.com/execute",
      method: "POST",
      json: {
        clientId: "eaf5d02e0106c43d533594b300366743",
        clientSecret:
          "6faab0531e48a67cedc676a7baeb1bfae1e30f8abdd8510c593a94a97c6fceeb",
        script: req.body.code,
        stdin: ip,
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
