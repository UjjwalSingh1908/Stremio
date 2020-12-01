import React, { Component } from "react";
import ReactPlayer from "react-player";
import classes from "./VideoList.css";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

class VideoList extends Component {
  render() {
    return (
      <Link to={"/videoplayer/" + this.props.id} className={classes.Link}>
        <div className={classes.VideoList}>
          <div className={classes.playerwrapper}>
            <ReactPlayer
              url={this.props.videourl}
              light="https://www.vidyard.com/media/video-marketing-1920x1080.jpg"
              className={classes.thumbnail}
            />
          </div>

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
      </Link>
    );
  }
}

export default VideoList;
