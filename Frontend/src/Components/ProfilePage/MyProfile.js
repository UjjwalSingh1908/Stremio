import { Avatar, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../Navigation/Sidebar";
import classes from "./Profile.css";
import IconButton from "@material-ui/core/IconButton";
import ServerService from "../../ServerService";

class MyProfile extends Component {
  state = {
    input: {},
  };

  componentDidMount() {
    ServerService.EditProfile()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <React.Fragment>
        <SideBar>
          <Container fluid className={classes.container}>
            <Row style={{ padding: "4rem" }}>
              <Col xs={{ offset: 3, span: 6 }}>
                <Form>
                  <div className={classes.imagecontainer}>
                    <Avatar src="" className={classes.myprofileimage} />

                    <div className={classes.overlay}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <FontAwesomeIcon
                            icon={faCamera}
                            className={classes.icon}
                          />
                        </IconButton>
                      </label>
                    </div>
                  </div>

                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      onChange={this.inputHandler}
                      name="name"
                      className={classes.forminput}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Channel Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      onChange={this.inputHandler}
                      name="channelName"
                      className={classes.forminput}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      onChange={this.inputHandler}
                      name="about"
                      className={classes.forminput}
                    />
                  </Form.Group>
                  <Button variant="contained" color="secondary" fullWidth>
                    {" "}
                    Update Profile{" "}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default MyProfile;
