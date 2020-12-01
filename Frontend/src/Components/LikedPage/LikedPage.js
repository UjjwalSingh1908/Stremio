import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import classes from "./LikedPage.css";

class LikedPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="likedvideos">
          <section className={classes.section}></section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default LikedPage;
