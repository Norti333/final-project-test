import React from "react";
import Form from "./form";

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
        console.log("new stream created");
        let subContainer = document.createElement("div");
        subContainer.id = "stream-" + event.stream.streamId;
        document.getElementById("subscriber").appendChild(subContainer);
        session.subscribe(event.stream, subContainer);
      }
    });
    session.connect(data.token);

    // console.log(data.sessionId);
    // //** Initialize an OpenTok Session object
    // const session = OT.initSession(data.apiKey, data.sessionId);
    // session.connect(data.token, function(err) {
    //   if (err) {
    //     console.log("Error Connecting: ", err.name, err.message);
    //   } else {
    //     console.log("Connected to the Session.");
    //     if (session.capabilities.publish == 1) {
    //       let publisherProperties = { insertMode: "append" };
    //       let publisher = OT.initPublisher(
    //         "publisher",
    //         publisherProperties,
    //         function(error) {
    //           if (error) {
    //             console.log(error);
    //           } else {
    //             console.log("Publisher Initialized.");
    //           }
    //         }
    //       );
    //       session.publish(publisher, function(err) {
    //         if (err) {
    //           console.log(err);
    //         } else {
    //           console.log("Publishing a Stream.");
    //         }
    //       });
    //       publisher.on("streamCreated", function(event) {
    //         console.log("The Publisher started streaming.");
    //       });
    //     } else {
    //       console.log(session.capabilities.publish);
    //       let subscriberProperties = { insertMode: "append" };
    //       let subscriber = session.subscribe(
    //         event.stream,
    //         "subscribers",
    //         subscriberProperties,
    //         function(error) {
    //           if (error) {
    //             console.log(error);
    //           } else {
    //             console.log("Subscriber added.");
    //           }
    //         }
    //       );
    //     }
    //   }
    // });
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
