import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../Navigation/Sidebar";
import VideoList from "./VideoList";
import classes from "./YourVideos.css";
import { Videocam } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import UploadModal from "../Modals/UploadModal";
import { connect } from "react-redux";
import { AssyncYourVideos } from "../../action";
import { BASE_URL } from "../../ServerService";

class YourVideos extends Component {
  state = {
    modalShow: false,
  };

  componentDidMount() {
    this.props.ShowYourVideos();
  }

  render() {
    let videolist;
    let { yourvideos } = this.props;
    if (yourvideos) {
      console.log(yourvideos.yourvideos.data);
      videolist = yourvideos.yourvideos.data.videodata.map((data, index) => {
        return (
          <VideoList
            key={index}
            date={data.createdAt}
            comments={data.commentsCount}
            views={data.viewsCount}
            likes={data.likesCount}
            thumbnail={BASE_URL + data.videoThumbnail}
            id={data.id}
            title={data.title}
          />
        );
      });
    }
    if (yourvideos) {
      return (
        <React.Fragment>
          <UploadModal
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          />
          <SideBar active="yourvideos">
            <section
              style={{
                backgroundColor: "#121212",
                minHeight: "100vh",
                padding: "4rem",
              }}
            >
              <div className={classes.userdetails}>
                <Avatar
                  src={BASE_URL + yourvideos.yourvideos.data.profilepic}
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
                    {yourvideos.yourvideos.data.channelName}
                  </span>
                  <br />
                  <span style={{ fontSize: "1rem", color: "#aaa" }}>
                    {" "}
                    {yourvideos.yourvideos.data.subscriberCount} Subscribers
                  </span>
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Videocam />}
                  className={classes.uploadIcon}
                  onClick={() => this.setState({ modalShow: true })}
                >
                  Upload
                </Button>
              </div>

              <Container className={classes.container}>
                <hr className={classes.hr} />
                <Row>
                  <Col xs={3}>Video</Col>
                  <Col xs={2}>Date</Col>
                  <Col xs={1}>Views</Col>
                  <Col xs={2}>Comments </Col>
                  <Col xs={1}>Likes</Col>
                  <Col xs={2}>Delete Video</Col>
                </Row>
                <hr className={classes.hr} />
                {videolist}
              </Container>
            </section>
          </SideBar>
        </React.Fragment>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => ({
  yourvideos: state.yourvideos,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ShowYourVideos: () => dispatch(AssyncYourVideos()),
    //sort: (a,b,c,d)  => dispatch(sort(a,b,c,d)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(YourVideos);
