import React, { Component } from "react";
import ServerService from "../../ServerService";
import SideBar from "../Navigation/Sidebar";
import classes from "./SubscribedPage.css";
import VideoCard from "../VideoCard/VideoCard";
import { Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../ServerService";
import ChannelCard from "../ChannelCard/ChannelCard";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

class SubscribedPage extends Component {
  state = {
    videos: [],
    channels: [],
  };

  componentDidMount() {
    ServerService.Subscribed()
      .then((res) => {
        console.log(res);
        this.setState({ videos: res.data.data });
        let videos = res.data.data;

        if (videos.length === 0) {
          ServerService.RecommendedChannels().then((res) => {
            console.log(res);
            this.setState({ channels: res.data.data });
          });
        }
      })
      .catch((err) => {
        //console.log(err.response);
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

    let channels;

    if (this.state.channels.length) {
      channels = this.state.channels.map((data, index) => {
        return (
          <ChannelCard
            key={index}
            name={data.channelName}
            userId={data.id}
            profilepic={BASE_URL + data.profilepic}
            subscriberCount={data.subscriberCount}
          />
        );
      });
    }

    return (
      <React.Fragment>
        <SideBar active="subscribed">
          <section className={classes.section}>
            <Container fluid className={classes.cardholder}>
              <Row>
                {videos}
                {channels}
              </Row>
              <Loader promiseTracker={usePromiseTracker} />
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default SubscribedPage;
