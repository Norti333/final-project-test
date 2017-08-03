import React from "react";
import Form from "./Form";

const axios = require("axios");

class FinalProject extends React.Component {
  constructor(props) {
    super(props);
    this.connectToSession = this.connectToSession.bind(this);
  }

  connectToSession(data) {
    let session = OT.initSession(data.apiKey, data.sessionId);
    let publisher = OT.initPublisher("publisher");

    session.on({
      sessionConnected: function(event) {
        session.publish(publisher);
      },
      streamCreated: function(event) {
        let subContainer = document.createElement("div");
        subContainer.id = "stream-" + event.stream.streamId;
        document.getElementById("subscriber").appendChild(subContainer);
        session.subscribe(event.stream, subContainer);
      }
    });
    session.connect(data.token, function(err) {
      if (err) {
        console.log(`Unable to Connect :( :  + ${err.message}`);
      } else {
        console.log("Connected to the Session.");
      }
    });
  }

  render() {
    return (
      <div>
        <h1>OpenTok React Test</h1>
        <div id="videos">
          <div id="subscriber" />
          <div id="publisher" />
        </div>
        <Form connectToSession={this.connectToSession} />
      </div>
    );
  }
}

export default FinalProject;
