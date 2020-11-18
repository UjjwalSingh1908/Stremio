import React, { Component } from "react";

import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";

class TrendingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideBar active="trending">
          <section>
            <div>
              <VideoCard />
            </div>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default TrendingPage;
