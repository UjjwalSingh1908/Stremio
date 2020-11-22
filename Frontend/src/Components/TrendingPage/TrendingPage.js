import React, { Component } from "react";
import classes from "./TrendingPage.css";
import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";

class TrendingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="trending">
          <section className={classes.section}></section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default TrendingPage;
