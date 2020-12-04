import React, { Component } from "react";
import ReactPlayer from "react-player";
import classes from "./VideoList.css";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

class VideoList extends Component {
  render() {
    return (
      <div className={classes.VideoList}>
        <Link to={"/videoplayer/" + this.props.id} className={classes.Link}>
          <div className={classes.imagecontainer}>
            <img
              alt=""
              src={this.props.thumbnail}
              className={classes.thumbnail}
            />
            <div className={classes.overlay}>
              <FontAwesomeIcon icon={faPlay} className={classes.icon} />
            </div>
          </div>
        </Link>
        <div className={classes.content}>
          <div className={classes.heading}> {this.props.title} </div>
          <div className={classes.subheading}>
            {" "}
            {this.props.channelname} . {this.props.views} Views .{" "}
            <TimeAgo datetime={this.props.date} locale="en-US" />{" "}
          </div>
          <div className={classes.description}>
            {" "}
            {this.props.description} <br />{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default VideoList;
