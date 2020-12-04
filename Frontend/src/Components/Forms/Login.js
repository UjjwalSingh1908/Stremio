import React, { Component } from "react";
import Navbar from "../Navigation/Navbar";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import classes from "./Forms.css";
import ServerService from "../../ServerService";
import Alerts from "../Alerts/Alert";

class Login extends Component {
  state = {
    input: { email: "", password: "" },
    errors: {},
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

        errors["msg"] = "Please enter a valid email address.";
      }

      this.setState({
        errors: errors,
      });

      return isValid;
    }
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
      // alert("validation successful");
      const data = {
        email: this.state.input.email,
        password: this.state.input.password,
      };
      ServerService.Login(data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("token", res.data.accesstoken);
            localStorage.setItem("refreshtoken", res.data.refreshtoken);
            localStorage.setItem("profilepic", res.data.user.profilepic);
            localStorage.setItem("id", res.data.user.id);
            this.setState({ redirect: "/" });
          } else {
            this.setState({
              type: "error",
              text: "Sorry! something went wrong...",
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.setState({ type: "error", text: err.response.data.message });
          //alert(err.response.data.error);
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
          <Container fluid>
            <Row>
              {alert}
              <Col md={{ span: 4, offset: 4 }} className={classes.loginform}>
                <div className={classes.heading}> LOGIN </div>
                <Form onSubmit={this.submitForm}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      required
                      onChange={this.handleChange}
                    />

                    <div className={classes.error}>{this.state.errors.msg}</div>
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicPassword"
                    style={{ marginTop: "2rem" }}
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <Link to="/forgotpassword" className={classes.link}>
                      Forgot Password?
                    </Link>
                  </Form.Group>

                  <Button
                    variant="null"
                    type="submit"
                    className={classes.button}
                  >
                    Login
                  </Button>
                  <div>
                    New User?{" "}
                    <Link to="/signup" className={classes.link}>
                      {" "}
                      Signup{" "}
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

export default Login;
