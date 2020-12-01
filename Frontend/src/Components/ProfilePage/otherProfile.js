import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import classes from "./Profile.css";
import { Row, Col, Container } from "react-bootstrap";
import { Avatar, Button } from "@material-ui/core";

class otherProfile extends Component {
  state = {
    subscribed: false,
  };

  toggleSubscribe = () => {
    let localSaved = this.state.subscribed;
    localSaved = !localSaved;
    this.setState({ subscribed: localSaved });
  };

  render() {
    return (
      <React.Fragment>
        <SideBar>
          <Container fluid className={classes.container}>
            <Row className={classes.profile}>
              <Col xs={12}>
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
                  {this.state.subscribed ? (
                    <Button
                      variant="contained"
                      className={classes.subscribe}
                      onClick={this.toggleSubscribe}
                    >
                      Subscribed
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.subscribe}
                      onClick={this.toggleSubscribe}
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </Col>
              <Col xs={12} style={{ color: "#fff" }}>
                <span style={{ fontSize: "1.5rem" }}>About</span> <br />
                About me
              </Col>
            </Row>
          </Container>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default otherProfile;
