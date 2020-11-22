import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import ServerService from "../../ServerService";
import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";
import Alerts from "../Alerts/Alert";

import classes from "./LandingPage.css";

class LandingPage extends Component {
  state = {
    videos: [],
    text: "",
    type: "",
  };

  componentDidMount() {
    ServerService.Home()
      .then((res) => {
        console.log(res);
        this.setState({ videos: res.data.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    let alert = <div style={{ lineHeight: "5", display: "none" }}>a</div>;

    if (this.state.text)
      alert = <Alerts type={this.state.type} text={this.state.text} />;
    const video = this.state.videos.map((data) => {
      return (
        <VideoCard
          key={data.id}
          id={data.id}
          title={data.title}
          videourl={"https://stremio--app.herokuapp.com/" + data.videourl}
          channelname={data.user.name}
          profile={data.user.profilepic}
          views={data.views}
          date={data.createdAt}
        />
      );
    });
    return (
      <React.Fragment>
        <SideBar active="home">
          <section className={classes.LandingPage}>
            <Container fluid className={classes.cardholder}>
              {alert}
              <Row>{video}</Row>
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default LandingPage;
