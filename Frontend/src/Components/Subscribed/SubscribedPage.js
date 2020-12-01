import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import classes from "./SubscribedPage.css";

class SubscribedPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="subscribed">
          <section className={classes.section}></section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default SubscribedPage;
