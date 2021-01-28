import React, { Component } from "react";
import { Row } from "react-bootstrap";
import ServerService, { BASE_URL } from "../../ServerService";
import VideoList from "../YourVideos/VideoList";

class TrendingCategories extends Component {
  state = {
    videos: [],
    category: "",
  };

  componentDidMount() {
    const query = this.props.match.params.id;
    this.setState({ category: query });
    ServerService.Category(query)
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

  componentDidUpdate() {
    const query = this.props.match.params.id;
    if (query !== this.state.category) {
      this.setState({ category: query });
      ServerService.Category(query)
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
    const category = this.props.match.params.id;
    return (
      <Row>
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "1.1rem",
            padding: "1rem",
          }}
        >
          {" "}
          {category.toUpperCase()}{" "}
        </div>
        <Row>{video}</Row>
      </Row>
    );
  }
}

export default TrendingCategories;
