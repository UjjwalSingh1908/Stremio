import ReactPlayer from "react-player";
import React, { Component } from "react";
import classes from "./RecommendedVideo.css";
import TimeAgo from "timeago-react";
import { BASE_URL } from "../../ServerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class RecommendedVideo extends Component {
  componentDidMount() {
    console.log(BASE_URL);
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.container}>
          <Link to={"/videoplayer/" + this.props.videoId}>
            <div className={classes.imagecontainer}>
              <img
                alt=""
                src={BASE_URL + this.props.thumbnail}
                className={classes.thumbnail}
              />
              <div className={classes.overlay}>
                <FontAwesomeIcon icon={faPlay} className={classes.icon} />
              </div>
            </div>
          </Link>
          <div className={classes.content}>
            <span className={classes.title}>{this.props.title} </span> <br />
            <span className={classes.information}>
              {this.props.channelName} <br />
              {this.props.views}
              <TimeAgo datetime={this.props.date} locale="en-US" />
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecommendedVideo;
