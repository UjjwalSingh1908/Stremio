import React, { Component } from "react";
import classes from "./YourVideos.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";

class VideoList extends Component {
  render() {
    return (
      <Row>
        <Col xs={3}>
          {" "}
          <Link to={"/videoplayer/" + this.props.id} className={classes.Link}>
            <img src="https://fakeimg.pl/300/" className={classes.img} /> Video
            Title
          </Link>
        </Col>
        <Col xs={2}>Date</Col>
        <Col xs={1}>Views</Col>
        <Col xs={2}>Comments </Col>
        <Col xs={1}>Likes</Col>
        <Col xs={2}>
          <DeleteIcon
            fontSize="medium"
            style={{ cursor: "pointer" }}
            Onclick={this.clickhandler}
          />
        </Col>
      </Row>
    );
  }
}

export default VideoList;
