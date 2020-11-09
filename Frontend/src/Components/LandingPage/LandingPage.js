import React, { Component } from "react";
import NavBar from "../Navigation/Navbar";
import SideBar from "../Navigation/Sidebar";
import { Row, Col, Container } from "react-bootstrap";
import classes from "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  }
}

export default LandingPage;
