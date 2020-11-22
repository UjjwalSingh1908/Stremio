import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import SideBar from "../Navigation/Sidebar";
import classes from "./VideoPlayer.css";

class VideoPlayer extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <SideBar>
        <Container fluid className={classes.section}>
          <Row>
            <Col xs={{ span: 10, offset: 1 }}>
              <ReactPlayer
                url={this.props.location.state.url}
                playing
                className={classes.videoplayer}
                width="60rem"
                height="30rem"
                style={{ marginTop: "3rem" }}
                controls
              />
            </Col>
          </Row>
        </Container>
      </SideBar>
    );
  }
}

export default VideoPlayer;
