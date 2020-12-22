import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import classes from "./VideoCard.css";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../ServerService";

class VideoCard extends Component {
  render() {
    return (
      <Card className={classes.videocard}>
        <Link to={"/videoplayer/" + this.props.id}>
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
        <Card.Body className={classes.cardbody}>
          <div>
            <div>
              <Link to={"/profile/" + this.props.userId}>
                <Avatar
                  alt="profile"
                  className={classes.profileimage}
                  src={BASE_URL + this.props.profile}
                />
              </Link>
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
