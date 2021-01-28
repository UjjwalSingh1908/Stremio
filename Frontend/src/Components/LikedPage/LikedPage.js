import React, { Component } from "react";
import ServerService from "../../ServerService";
import SideBar from "../Navigation/Sidebar";
import classes from "./LikedPage.css";
import VideoCard from "../VideoCard/VideoCard";
import { Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../ServerService";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

class LikedPage extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    ServerService.LikedVideos()
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
        <SideBar active="likedvideos">
          <section className={classes.section}>
            <Container fluid className={classes.cardholder}>
              <Row>{videos}</Row>
            </Container>
          </section>
          <Loader promiseTracker={usePromiseTracker} />
        </SideBar>
      </React.Fragment>
    );
  }
}

export default LikedPage;
