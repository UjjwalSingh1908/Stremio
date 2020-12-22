import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";
import { Container, Row } from "react-bootstrap";
import ServerService from "../../ServerService";
import { BASE_URL } from "../../ServerService";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

class WatchLater extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    ServerService.WatchLater()
      .then((res) => {
        // console.log(res);
        this.setState({ videos: res.data.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  render() {
    let videos = this.state.videos.map((data) => {
      return (
        <VideoCard
          key={data.id}
          id={data.id}
          userId={data.user.id}
          title={data.title}
          videourl={BASE_URL + data.videourl}
          thumbnail={BASE_URL + data.videoThumbnail}
          channelname={data.user.name}
          profile={data.user.profilepic}
          views={data.viewsCount}
          date={data.createdAt}
        />
      );
    });
    return (
      <React.Fragment>
        <SideBar active="watchlater">
          <section
            style={{
              backgroundColor: "#121212",
              minHeight: "100vh",
            }}
          >
            <Container fluid style={{ padding: "1.5rem" }}>
              <Row>{videos}</Row>
            </Container>
          </section>
          <Loader promiseTracker={usePromiseTracker} />
        </SideBar>
      </React.Fragment>
    );
  }
}

export default WatchLater;
