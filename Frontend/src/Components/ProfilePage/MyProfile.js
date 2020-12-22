import { Avatar, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../Navigation/Sidebar";
import classes from "./Profile.css";
import ServerService, { BASE_URL } from "../../ServerService";
import Alerts from "../Alerts/Alert";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

class MyProfile extends Component {
  state = {
    input: {
      name: "",
      channelName: "",
      about: "",
    },
    data: [],
    imgsrc: "",
    image: "",
    type: "",
    text: "",
  };

  componentDidMount() {
    ServerService.Profile(localStorage.getItem("id"))
      .then((res) => {
        console.log(res);
        if (res.status === 200)
          this.setState({
            data: res.data.data,
            imgsrc: BASE_URL + res.data.data.profilepic,
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  inputHandler = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  imageHandler = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: file,
        imgsrc: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      name: this.state.input.name || this.state.data.name,
      channelName: this.state.input.channelName || this.state.data.channelName,
      about: this.state.input.about || this.state.data.about,
      image: this.state.image || this.state.data.profilepic,
    };

    const fd = new FormData();

    for (let formElement in data) {
      fd.append(formElement, data[formElement]);
      //console.log(formElement, data[formElement]);
    }

    ServerService.EditProfile(fd)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("profilepic", this.state.imgsrc);
          this.setState({
            type: "success",
            text: "Profile updated successfully!",
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    let alert = <div style={{ lineHeight: "5", display: "none" }}>a</div>;

    if (this.state.text)
      alert = <Alerts type={this.state.type} text={this.state.text} />;
    return (
      <React.Fragment>
        <SideBar>
          <Container fluid className={classes.container}>
            {alert}
            <Row style={{ padding: "4rem" }}>
              <Col xs={{ offset: 1, span: 10 }} md={{ offset: 3, span: 6 }}>
                <div
                  style={{
                    fontSize: "2rem",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  EDIT PROFILE{" "}
                </div>
                <Form
                  onSubmit={this.submitHandler}
                  style={{ marginTop: "2rem" }}
                >
                  <div className={classes.imagecontainer}>
                    <Avatar
                      src={this.state.imgsrc}
                      className={classes.myprofileimage}
                    />
                    <div className={classes.overlay}>
                      <input
                        type="file"
                        accept="image/jpeg"
                        id="profile"
                        label="Profile Image"
                        onChange={this.imageHandler}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="profile">
                        <FontAwesomeIcon
                          icon={faCamera}
                          className={classes.icon}
                        />
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
                      defaultValue={this.state.data.name}
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
                      defaultValue={this.state.data.channelName}
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
                      defaultValue={this.state.data.about}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    {" "}
                    Update Profile{" "}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
          <Loader promiseTracker={usePromiseTracker} />
        </SideBar>
      </React.Fragment>
    );
  }
}

export default MyProfile;
