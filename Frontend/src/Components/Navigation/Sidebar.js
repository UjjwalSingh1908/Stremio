import React from "react";
import Sidebar from "react-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faHome,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { Nav, NavItem } from "react-bootstrap";
import classes from "./Navigation.css";
import { Link } from "react-router-dom";

const mql = window.matchMedia(`(min-width: 600px)`);

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: true,
      sidebarOpen: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  //componentWillUnmount() {
  //  this.state.mql.removeListener(this.mediaQueryChanged);
  //}

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar
          sidebar={
            <React.Fragment>
              <div className={classes.sidebarlogo}>
                {" "}
                <Link to="/" className={classes.link}>
                  {" "}
                  STREMIO{" "}
                </Link>{" "}
              </div>
              <div className={classes.sidebarContent}>
                <nav>
                  <Link to="/" className={classes.link}>
                    <div
                      className={
                        this.props.active === "home"
                          ? classes.activelink
                          : classes.sidelink
                      }
                    >
                      <FontAwesomeIcon icon={faHome} />{" "}
                      <span style={{ paddingLeft: "1rem" }}> Home </span>
                    </div>
                  </Link>
                  <Link to="/trending" className={classes.link}>
                    <div
                      className={
                        this.props.active === "trending"
                          ? classes.activelink
                          : classes.sidelink
                      }
                    >
                      <FontAwesomeIcon icon={faChartLine} />{" "}
                      <span style={{ paddingLeft: "1rem" }}> Trending </span>
                    </div>
                  </Link>
                </nav>
              </div>
            </React.Fragment>
          }
          sidebarClassName={classes.sidebar}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <Navbar className={classes.Navbar} sticky="top">
            <span className={classes.burgericon}>
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => this.onSetSidebarOpen(true)}
                className={classes.hamburger}
              />{" "}
            </span>

            <Navbar.Brand as={Link} to="/" className={classes.sidelogo}>
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
          {this.props.children}
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default SideBar;
