import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../Navigation/Sidebar";
import VideoList from "./VideoList";
import classes from "./YourVideos.css";
import { Videocam } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import UploadModal from "../Modals/UploadModal";

class YourVideos extends Component {
  state = {
    modalShow: false,
  };

  render() {
    return (
      <React.Fragment>
        <UploadModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <SideBar active="yourvideos">
          <section
            style={{
              backgroundColor: "#121212",
              minHeight: "100vh",
              padding: "4rem",
            }}
          >
            <div className={classes.userdetails}>
              <Avatar src="" className={classes.profileimage} />
              <div>
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  Channel Name{" "}
                </span>
                <br />
                <span style={{ fontSize: "1rem", color: "#aaa" }}>
                  {" "}
                  3M Subscribers{" "}
                </span>
              </div>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Videocam />}
                className={classes.uploadIcon}
                onClick={() => this.setState({ modalShow: true })}
              >
                Upload
              </Button>
            </div>

            <Container className={classes.container}>
              <hr className={classes.hr} />
              <Row>
                <Col xs={3}>Video</Col>
                <Col xs={2}>Date</Col>
                <Col xs={1}>Views</Col>
                <Col xs={2}>Comments </Col>
                <Col xs={1}>Likes</Col>
                <Col xs={2}>Delete Video</Col>
              </Row>
              <hr className={classes.hr} />
              <VideoList />
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default YourVideos;
