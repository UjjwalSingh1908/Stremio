import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";

class WatchLater extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="watchlater">
          <section
            style={{
              backgroundColor: "#121212",
              minHeight: "100vh",
              padding: "4rem",
            }}
          ></section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default WatchLater;
