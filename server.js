const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const OpenTok = require("opentok");

const apiKey = "45929252";
const apiSecret = "35e09c239d512dedf9ce33b0b51e1b99ee5f2bcf";
let names = [];

const app = express();

app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//** Initialize OpenTok
const opentok = new OpenTok(apiKey, apiSecret);

app.post("/startSession", function(req, res) {
  let nameToFind = req.body.name;

  function findName(myName) {
    return myName.name === nameToFind;
  }
  let temp = names.find(findName);

  if (temp) {
    console.log("Room Name Already Exists.");
    res.send();
  } else {
    // ** Create a Session
    opentok.createSession({ mediaMode: "relayed" }, function(err, session) {
      if (err) throw err;
      let sessionId = session.sessionId;

      //* Generate a New Token
      var tokenOptions = {
        role: "moderator"
      };
      let token = opentok.generateToken(sessionId, tokenOptions);

      let data = {
        apiKey: apiKey,
        sessionId: sessionId,
        token: token
      };

      names.push({
        name: nameToFind,
        sessionId: sessionId
      });
      res.send(data);
    });
  }
});

app.post("/joinSession", function(req, res) {
  let nameToFind = req.body.name;

  function findName(myName) {
    return myName.name === nameToFind;
  }
  let temp = names.find(findName);

  if (!temp) {
    console.log("Not A Valid Room Name");
    res.send();
  } else {
    let sessionId = temp.sessionId;
    let token = opentok.generateToken(sessionId);
    let data = {
      apiKey: apiKey,
      sessionId: sessionId,
      token: token
    };

    res.send(data);
  }
});

//* Handle Browser refresh by redirecting to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./server/static/index.html"));
});

app.listen(process.env.PORT || 8000, function() {
  console.log("You're app is now ready at http://*localhost:8000/");
});
