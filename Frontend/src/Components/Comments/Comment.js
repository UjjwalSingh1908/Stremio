import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import TimeAgo from "timeago-react";

class Comment extends Component {
  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "2rem" }}
      >
        <Avatar src={this.props.profilepic} style={{ marginRight: "1rem" }} />
        <div>
          {this.props.name}{" "}
          <span style={{ color: "#757575" }}>
            <TimeAgo datetime={this.props.date} locale="en-US" />{" "}
          </span>{" "}
          <br />
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Comment;
