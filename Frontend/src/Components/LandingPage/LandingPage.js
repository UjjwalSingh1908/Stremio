import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";
import Alerts from "../Alerts/Alert";
import { connect } from "react-redux";
import { AssyncHomeVideos } from "../../action";
import { BASE_URL } from "../../ServerService";
import classes from "./LandingPage.css";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

class LandingPage extends Component {
  state = {
    videos: [],
    text: "",
    type: "",
  };

  componentDidMount() {
    // ServerService.Home()
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ videos: res.data.data });
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

    this.props.ShowHomeVideos();
  }

  render() {
    let video = null;
    let { home } = this.props;
    if (home) console.log(home.home.data);
    let alert = <div style={{ lineHeight: "5", display: "none" }}>a</div>;

    if (this.state.text)
      alert = <Alerts type={this.state.type} text={this.state.text} />;
    if (home) {
      video = home.home.data.map((data) => {
        console.log(data);
        return (
          <VideoCard
            key={data.id}
            id={data.id}
            userId={data.userId}
            title={data.title}
            url={BASE_URL + data.videourl}
            thumbnail={BASE_URL + data.videoThumbnail}
            channelname={data.user.name}
            profile={data.user.profilepic}
            views={data.viewsCount}
            date={data.createdAt}
          />
        );
      });
    }
    return (
      <React.Fragment>
        <SideBar active="home">
          <section className={classes.LandingPage}>
            <Container fluid className={classes.cardholder}>
              {alert}
              <Row>{video}</Row>
              <Loader promiseTracker={usePromiseTracker} />
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ShowHomeVideos: () => dispatch(AssyncHomeVideos()),
    //sort: (a,b,c,d)  => dispatch(sort(a,b,c,d)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
