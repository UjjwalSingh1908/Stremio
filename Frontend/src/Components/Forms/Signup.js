import React, { Component } from "react";
import Navbar from "../Navigation/Navbar";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import classes from "./Forms.css";

import Alerts from "../Alerts/Alert";
import ServerService from "../../ServerService";

class Signup extends Component {
  state = {
    input: {
      name: "",
      channelName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: { email: "", passwordlen: "", confirmpw: "" },
    redirect: null,
    type: "",
    text: "",
  };

  validate = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (typeof input["email"] !== undefined) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;

        errors["email"] = "Please enter a valid email address.";
      }
    }
    if (
      typeof input["password"] !== undefined &&
      typeof input["confirmPassword"] !== undefined
    ) {
      if (input["password"] !== input["confirmPassword"]) {
        isValid = false;
        errors["confirmpw"] = "Passwords don't match!";
      }
      if (input["password"].length < 6) {
        isValid = false;
        errors["passwordlen"] = "Password must be of minimum 6 characters!";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  };

  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    if (this.validate()) {
      //alert("validation successful");
      const data = {
        name: this.state.input.name,
        channelName: this.state.input.channelName,
        email: this.state.input.email,
        password: this.state.input.password,
        confirmPassword: this.state.input.confirmPassword,
      };
      // console.log(data);
      ServerService.Signup(data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // alert(
            //   "we have sent u an email for verification! please verify your account to login "
            // );
            this.setState({
              type: "success",
              text:
                "We have sent u an email for verification! please verify your account to login...",
            });
            //this.setState({ redirect: "/login" });
          } else if (res.status === 400) {
            this.setState({
              type: "error",
              text: "hi",
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  render() {
    let alert = <div style={{ lineHeight: "5", display: "none" }}>a</div>;

    if (this.state.text)
      alert = <Alerts type={this.state.type} text={this.state.text} />;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.page}>
          {alert}
          <Container fluid>
            <Row>
              <Col md={{ span: 4, offset: 4 }} className={classes.signupform}>
                <div className={classes.heading}> SIGN UP </div>
                <Form onSubmit={this.submitForm}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      required
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Channel Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter a unique Channel Name"
                      name="channelName"
                      required
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      required
                      onChange={this.handleChange}
                    />

                    <div className={classes.error}>
                      {this.state.errors.email}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password  (minimum 6 characters)"
                      name="password"
                      required
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.state.errors.passwordlen}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-Enter Password"
                      name="confirmPassword"
                      required
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.state.errors.confirmpw}
                    </div>
                  </Form.Group>

                  <Button
                    variant="null"
                    type="submit"
                    className={classes.button}
                  >
                    Signup
                  </Button>
                  <div>
                    Already Registered?{" "}
                    <Link to="/login" className={classes.link}>
                      {" "}
                      Login{" "}
                    </Link>{" "}
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Signup;
