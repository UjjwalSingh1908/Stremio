import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import SideBar from "../Navigation/Sidebar";
import VideoList from "./VideoList";
import classes from "./YourVideos.css";
import { Videocam } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import UploadModal from "../Modals/UploadModal";
import { connect } from "react-redux";
import { AssyncYourVideos } from "../../action";
import { BASE_URL } from "../../ServerService";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";

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
            index={index}
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
            <section className={classes.section}>
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

              <Container fluid className={classes.container}>
                <hr className={classes.hr} />
                <Row>
                  <Col xs={12}>
                    <Table responsive="sm" borderless style={{ color: "#fff" }}>
                      <thead>
                        <tr>
                          <th>Video </th>
                          <th> Date</th>
                          <th> Views</th>
                          <th> Comments</th>
                          <th> Likes</th>
                          <th> Delete Video</th>
                        </tr>
                      </thead>
                      <tbody>{videolist}</tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            </section>
            <Loader promiseTracker={usePromiseTracker} />
          </SideBar>
        </React.Fragment>
      );
    } else {
      return <SideBar active="yourvideos"></SideBar>;
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
