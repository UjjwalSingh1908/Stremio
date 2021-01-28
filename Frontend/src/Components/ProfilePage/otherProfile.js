import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import classes from "./Profile.css";
import { Row, Col, Container } from "react-bootstrap";
import { Avatar, Button } from "@material-ui/core";
import ServerService, { BASE_URL } from "../../ServerService";
import VideoCard from "../VideoCard/VideoCard";

class otherProfile extends Component {
  state = {
    subscribed: false,
    data: [],
    videos: [],
  };

  toggleSubscribe = () => {
    let localSaved = this.state.subscribed;
    localSaved = !localSaved;
    this.setState({ subscribed: localSaved });
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    ServerService.Profile(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200)
          this.setState({
            data: res.data.data,
            videos: res.data.data.videodata,
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    let videos = this.state.videos.map((data, index) => {
      return (
        <VideoCard
          key={index}
          id={data.id}
          userId={data.userId}
          title={data.title}
          url={BASE_URL + data.videourl}
          thumbnail={BASE_URL + data.videoThumbnail}
          channelname={this.state.data.channelName}
          profile={this.state.data.profilepic}
          views={data.viewsCount}
          date={data.createdAt}
        />
      );
    });

    return (
      <React.Fragment>
        <SideBar>
          <Container fluid className={classes.container}>
            <Row className={classes.profile}>
              <Col xs={12}>
                <div className={classes.userdetails}>
                  <Avatar
                    src={BASE_URL + this.state.data.profilepic}
                    className={classes.profileimage}
                  />
                  <div>
                    <span
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {this.state.data.channelName}{" "}
                    </span>
                    <br />
                    <span style={{ fontSize: "1rem", color: "#aaa" }}>
                      {" "}
                      {this.state.data.subscriberCount} Subscribers{" "}
                    </span>
                  </div>
                  {this.state.data.isMe ? null : this.state.subscribed ? (
                    <Button
                      variant="contained"
                      className={classes.subscribe}
                      onClick={this.toggleSubscribe}
                    >
                      Subscribed
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.subscribe}
                      onClick={this.toggleSubscribe}
                    >
                      Subscribe
                    </Button>
                  )}
                </div>
              </Col>
              <Col xs={12} style={{ color: "#fff" }}>
                <span style={{ fontSize: "1.5rem" }}>About</span> <br />
                {this.state.data.about}
              </Col>
            </Row>
            <Row className={classes.videos}>Videos</Row>

            <Row
              style={{
                padding: "1rem",
              }}
            >
              {videos}
            </Row>
          </Container>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default otherProfile;
