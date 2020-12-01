import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import classes from "./History.css";

class HistoryPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="history">
          <section className={classes.section}></section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default HistoryPage;
