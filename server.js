const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const serviceAccount = require("./service-act-key.json");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackerrank-clone.firebaseio.com"
});

app.post("/sessionLogin", (req, res) => {
  console.log("session login");
  // Get the ID token passed and the CSRF token.
  console.log(req.body.idToken);
  console.log(req.body.csrfToken);
  const idToken = req.body.idToken.toString();
  const csrfToken = req.body.csrfToken.toString();
  // console.log(req.headers.csrfToken);
  //  Guard against CSRF attacks.
  // if (csrfToken !== req.header.csrfToken) {
  //   res.status(401).send("UNAUTHORIZED REQUEST!");
  //   return;
  // }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      sessionCookie => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie("session", sessionCookie, options);
        res.set("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify({ status: "success" }));
      },
      error => {
        console.log(error);
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

// Whenever a user is accessing restricted content that requires authentication.
app.get("/dashboard", (req, res) => {
  console.log("here");
  const sessionCookie = req.cookies.session || "";
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(decodedClaims => {
      serveContentForUser("/profile", req, res, decodedClaims);
    })
    .catch(error => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect("/login");
    });
});

app.post("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
