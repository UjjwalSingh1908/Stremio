import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import classes from "./VideoCard.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import TimeAgo from "timeago-react";

class VideoCard extends Component {
  render() {
    return (
      <Card className={classes.videocard}>
        <div className={classes.playerwrapper}>
          <Link
            to={{
              pathname: "/videoplayer",
              state: { url: this.props.videourl, id: this.props.id },
            }}
          >
            <ReactPlayer
              url={this.props.videourl}
              light="https://www.vidyard.com/media/video-marketing-1920x1080.jpg"
              className={classes.thumbnail}
              playsinline
            />
          </Link>
        </div>

        <Card.Body className={classes.cardbody}>
          <div>
            <div>
              <Avatar
                alt="profile"
                className={classes.profileimage}
                src={this.props.profile}
              />
            </div>
            <div className={classes.title}>{this.props.title}</div>

            <div className={classes.subtitle}>
              {this.props.channelname} <br /> {this.props.views} views.
              <TimeAgo datetime={this.props.date} locale="en-US" />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default VideoCard;
