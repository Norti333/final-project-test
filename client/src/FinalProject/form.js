import React from "react";

const axios = require("axios");

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitJoin = this.handleSubmitJoin.bind(this);
    this.state = {
      name: ""
    };
  }

  handleSubmitCreate(event) {
    event.preventDefault();
    let name = { name: this.state.name };
    let self = this;
    axios
      .post("/startSession", name)
      .then(function(res) {
        if (!res.data) {
          alert("Room Name Already Exists.");
        } else {
          self.props.connectToSession(res.data);
          self.setState({ name: "" });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleSubmitJoin(event) {
    event.preventDefault();
    let name = { name: this.state.name };
    let self = this;
    axios
      .post("/joinSession", name)
      .then(function(res) {
        if (!res.data) {
          alert("Please Enter A Valid Room Name.");
        } else {
          self.props.connectToSession(res.data);
          self.setState({ name: "" });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <form action="#" id="MyForm" onSubmit={this.handleSubmitCreate}>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="input-lg"
            id="name"
            placeholder="Enter Name"
            required
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
          <div className="">
            <button className="btn btn-primary btn-lg" type="submit">
              Create!
            </button>
            <button
              className="btn btn-primary btn-lg"
              onClick={this.handleSubmitJoin}
            >
              Join!
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default Form;
