import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Navigation.css";

class NavBar extends Component {
  render() {
    return (
      <Navbar className={classes.Navbar} sticky="top">
        <Navbar.Brand as={Link} to="/" className={classes.logo}>
          STREMIO
        </Navbar.Brand>
        <Form inline>
          <InputGroup className={classes.InputGroup}>
            <FormControl
              type="text"
              placeholder="Search"
              className={classes.Search}
            />
            <InputGroup.Append>
              <InputGroup.Text
                type="submit"
                className={classes.SearchIcon}
                as={Link}
                to="/search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <Navbar.Collapse className="justify-content-end">
          <Button
            variant="null"
            as={Link}
            to="/login"
            className={classes.loginButton}
          >
            Login
          </Button>
          <Button
            variant="null"
            as={Link}
            to="/signup"
            className={classes.signupButton}
          >
            Sign Up
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
