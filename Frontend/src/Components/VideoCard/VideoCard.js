import React, { Component } from "react";
import video from "../../assets/video.jpg";
import profile from "../../assets/profile.svg";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import classes from "./VideoCard.css";

class VideoCard extends Component {
  render() {
    return (
      <Card className={classes.videocard}>
        <Card.Img
          src={video}
          alt="video thumbnail"
          className={classes.thumbnail}
        />
        <Card.Body className={classes.cardbody}>
          <div>
            <div>
              <Avatar
                alt="profile"
                className={classes.profileimage}
                src={profile}
              />
            </div>
            <div className={classes.title}>Video Title</div>

            <div className={classes.subtitle}>
              Channel Name <br /> Views . 1 month ago
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default VideoCard;
