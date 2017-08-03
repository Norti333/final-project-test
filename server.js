//** Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const OpenTok = require("opentok");

const apiKey = "45929252";
const apiSecret = "35e09c239d512dedf9ce33b0b51e1b99ee5f2bcf";
let names = [];

//** Initialize the express app
const app = express();

app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//** Initialize OpenTok
const opentok = new OpenTok(apiKey, apiSecret);

app.post("/startSession", function(req, res) {
  let name = req.body.name;

  // ** Create a Session
  opentok.createSession({ mediaMode: "relayed" }, function(err, session) {
    if (err) throw err;
    let sessionId = session.sessionId;

    //* Generate a New Token
    var tokenOptions = {
      role: "moderator"
    };
    let token = opentok.generateToken(sessionId);

    let data = {
      apiKey: apiKey,
      sessionId: sessionId,
      token: token
    };

    names.push({
      name: name,
      sessionId: sessionId
    });
    console.log(names);
    res.send(data);
  });
});

app.post("/joinSession", function(req, res) {
  let nameToFind = req.body.name;
  function findName(myName) {
    return myName.name === nameToFind;
  }
  let temp = names.find(findName);
  let sessionId = temp.sessionId;

  // let tokenOptions = {};
  // tokenOptions.role = "publisher";
  let token = opentok.generateToken(sessionId);

  let data = {
    apiKey: apiKey,
    sessionId: sessionId,
    token: token
  };

  res.send(data);
});

//* Handle Browser refresh by redirecting to index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./server/static/index.html"));
});

app.listen(8000, function() {
  console.log("You're app is now ready at http://*localhost:8000/");
});
