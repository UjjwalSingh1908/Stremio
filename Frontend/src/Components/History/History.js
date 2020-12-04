import React, { Component } from "react";
import ServerService from "../../ServerService";
import SideBar from "../Navigation/Sidebar";
import classes from "./History.css";
import { Container, Row } from "react-bootstrap";
import VideoCard from "../VideoCard/VideoCard";
import { BASE_URL } from "../../ServerService";

class HistoryPage extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    ServerService.History()
      .then((res) => {
        console.log(res);
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
        <SideBar active="history">
          <section className={classes.section}>
            <Container fluid className={classes.cardholder}>
              <Row>{videos}</Row>
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default HistoryPage;
