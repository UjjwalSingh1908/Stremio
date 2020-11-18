import React, { Component } from "react";

import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";

import classes from "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="home">
          <section className={classes.LandingPage}>
            <div className={classes.cardholder}>
              <VideoCard />
            </div>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default LandingPage;
