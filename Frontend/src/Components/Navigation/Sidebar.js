import React from "react";
import Sidebar from "react-sidebar";
import { Nav, NavItem } from "react-bootstrap";
import classes from "./Navigation.css";
import { Link } from "react-router-dom";

const mql = window.matchMedia(`(min-width: 600px)`);

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

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
          className={classes.sidebar}
          sidebar={
            <div className={classes.sidebar}>
              hello
              <div></div>
            </div>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <button
            onClick={() => this.onSetSidebarOpen(true)}
            style={{ zIndex: "500" }}
          >
            Open sidebar{" "}
          </button>
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default SideBar;
