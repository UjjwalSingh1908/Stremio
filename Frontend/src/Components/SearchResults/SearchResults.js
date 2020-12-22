import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";
import { Container, Row } from "react-bootstrap";
import ServerService, { BASE_URL } from "../../ServerService";
import ChannelCard from "../ChannelCard/ChannelCard";

class SearchResults extends Component {
  state = {
    videos: [],
    channels: [],
    query: "",
  };

  componentDidMount() {
    let query = this.props.match.params.id;
    this.setState({ query: query });
    ServerService.Search(query)
      .then((res) => {
        console.log(res);
        this.setState({
          videos: res.data.videodata,
          channels: res.data.userdata,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  componentDidUpdate() {
    let query = this.props.match.params.id;
    if (query != this.state.query) {
      this.setState({ query: query });
      ServerService.Search(query)
        .then((res) => {
          console.log(res);
          this.setState({
            videos: res.data.videodata,
            channels: res.data.userdata,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  render() {
    let videos = this.state.videos.map((data) => {
      return (
        <VideoCard
          key={data.id}
          id={data.id}
          title={data.title}
          videourl={BASE_URL + data.videourl}
          channelname={data.name}
          profile={data.user.profilepic}
          views={data.viewsCount}
          date={data.createdAt}
          thumbnail={BASE_URL + data.videoThumbnail}
        />
      );
    });

    let channels = this.state.channels.map((data, index) => {
      return (
        <ChannelCard
          key={index}
          userId={data.id}
          name={data.channelName}
          profilepic={BASE_URL + data.profilepic}
          subscriberCount={data.subscriberCount}
          about={data.description}
        />
      );
    });
    return (
      <React.Fragment>
        <section
          style={{
            backgroundColor: "#121212",
            minHeight: "100vh",
          }}
        >
          <Container fluid style={{ padding: "1.5rem" }}>
            <Row> {channels} </Row>
            <Row>{videos}</Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default SearchResults;
