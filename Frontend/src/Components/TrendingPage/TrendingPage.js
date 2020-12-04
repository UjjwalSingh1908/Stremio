import React, { Component } from "react";
import classes from "./TrendingPage.css";
import SideBar from "../Navigation/Sidebar";
import VideoList from "../VideoList/VideoList";
import { Col, Container, Row } from "react-bootstrap";
import ServerService from "../../ServerService";
import { BASE_URL } from "../../ServerService";

class TrendingPage extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    ServerService.Trending()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ videos: res.data.data });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const video = this.state.videos.map((data) => {
      return (
        <VideoList
          key={data.id}
          id={data.id}
          title={data.title}
          videourl={BASE_URL + data.videourl}
          channelname={data.user.name}
          profile={data.user.profilepic}
          views={data.viewsCount}
          date={data.createdAt}
          description={data.description}
          thumbnail={BASE_URL + data.videoThumbnail}
        />
      );
    });

    return (
      <React.Fragment>
        <SideBar active="trending">
          <section className={classes.section}>
            <Container>
              <Row>
                <Col xs={10}>{video}</Col>
              </Row>
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default TrendingPage;
