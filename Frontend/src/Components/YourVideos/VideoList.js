import React, { Component } from "react";
import classes from "./YourVideos.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import dateFormat from "dateformat";
import ServerService from "../../ServerService";

class VideoList extends Component {
  deleteHandler = () => {
    ServerService.DeleteVideo(this.props.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <Row style={{ margin: "1rem" }}>
        <Col xs={3}>
          {" "}
          <Link to={"/videoplayer/" + this.props.id} className={classes.Link}>
            <img src={this.props.thumbnail} alt="" className={classes.img} />{" "}
            {this.props.title}
          </Link>
        </Col>
        <Col xs={2}>{dateFormat(this.props.date, "mmmm dS, yyyy")}</Col>
        <Col xs={1}> {this.props.views} </Col>
        <Col xs={2}> {this.props.comments} </Col>
        <Col xs={1}> {this.props.likes} </Col>
        <Col xs={2}>
          <div className={classes.hover}>
            <DeleteIcon
              className={classes.deleteicon}
              onClick={this.deleteHandler}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default VideoList;
