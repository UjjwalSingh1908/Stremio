import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import SideBar from "../Navigation/Sidebar";
import classes from "./VideoPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeartBroken,
  faShare,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import ShareModal from "../Modals/ShareModal";
import { Avatar, Button } from "@material-ui/core";
import ServerService from "../../ServerService";
import dateFormat from "dateformat";
import Comment from "../Comments/Comment";

class VideoPlayer extends Component {
  state = {
    comments: [],
    addcomment: "",
    saved: false,
    liked: false,
    modalShow: false,
    subscribed: false,
    subscribersCount: 0,
    likesCount: 0,
    profilepic: "",
    channelName: "",
    userId: "",
    views: 0,
    commentCount: 0,
    isVideoMine: false,
    data: [],
  };

  addComment = (e) => {
    this.setState({ addcomment: e.target.value }, () => {});
  };

  toggleLike = () => {
    let localLiked = this.state.liked;
    localLiked = !localLiked;
    this.setState({ liked: localLiked }, () => {
      this.likechanger();
    });
  };

  toggleSaved = () => {
    let localSaved = this.state.saved;
    localSaved = !localSaved;
    let videoId = this.state.data.id;
    ServerService.WatchLater().then((res) => {
      console.log(res);
      if (res.status === 200) this.setState({ saved: localSaved });
    });
  };

  toggleSubscribe = () => {
    let localSaved = this.state.subscribed;
    localSaved = !localSaved;
    this.setState({ subscribed: localSaved }, () => {
      ServerService.Subscribe(this.state.userId)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            let count = this.state.subscribersCount;
            if (this.state.subscribed) {
              count++;
              this.setState({ subscribersCount: count });
            } else {
              count--;
              this.setState({ subscribersCount: count });
            }
          }
        })
        .catch((err) => {
          err.response;
        });
    });
  };

  likechanger = () => {
    let count = this.state.likesCount;
    if (this.state.liked) {
      count++;
      this.setState({ likesCount: count });
      ServerService.Like(this.state.data.id).then((res) => {
        //console.log(res);
      });
    } else {
      count--;
      this.setState({ likesCount: count });
      ServerService.Unlike(this.state.data.id).then((res) => {
        // console.log(res);
      });
    }
  };

  submitComment = (event) => {
    event.preventDefault();
    const data = {
      text: this.state.addcomment,
    };
    ServerService.Comment(this.state.data.id, data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({ commentCount: this.state.commentCount + 1 });
        let comments = this.state.comments;
        let addedComment = {
          createdAt: Date.now(),
          text: this.state.addcomment,
          user: {
            channelName: this.state.channelName,
            profilepic: this.state.profilepic,
          },
        };
        comments.unshift(addedComment);
        this.setState({ comments: comments }, () => {
          //console.log(this.state.comments);
        });
      }
    });
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    ServerService.VideoDetails(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            data: res.data.data,
            liked: res.data.data.isLiked,
            likesCount: res.data.data.likesCount,
            profilepic: res.data.data.user.profilepic,
            channelName: res.data.data.user.channelName,
            subscribed: res.data.data.isSubscribed,
            userId: res.data.data.user.id,
            subscribersCount: res.data.data.subscribersCount,
            views: res.data.data.viewsCount,
            comments: res.data.data.comments,
            commentCount: res.data.data.commentsCount,
            isVideoMine: res.data.data.isVideoMine,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const comments = this.state.comments.map((data, index) => {
      return (
        <Comment
          key={index}
          date={data.createdAt}
          name={data.user.channelName}
          profilepic={data.user.profilepic}
          text={data.text}
        />
      );
    });

    return (
      <SideBar>
        <ShareModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        <Container fluid className={classes.section}>
          <Row>
            <Col xs={{ span: 10, offset: 1 }}>
              <ReactPlayer
                url={
                  "https://dfa417d1528d.ngrok.io/" + this.state.data.videourl
                }
                playing
                className={classes.videoplayer}
                width="100%"
                height="70vh"
                style={{ marginTop: "3rem" }}
                controls
              />
            </Col>

            <Col xs={{ span: 5, offset: 1 }} style={{ marginTop: "1rem" }}>
              <div>{this.state.data.title}</div>
              <div>
                <div>
                  {this.state.views} Views .{" "}
                  {dateFormat(this.state.data.createdAt, "mmmm dS, yyyy")}
                </div>
              </div>
            </Col>

            <Col xs={5} className={classes.iconContainer}>
              <div className={classes.hover}>
                <FontAwesomeIcon
                  icon={faShare}
                  onClick={() => this.setState({ modalShow: true })}
                  className={classes.iconInactive}
                />
                <span className={classes.title}>SHARE</span>
              </div>
              <div className={classes.hover} onClick={this.toggleSaved}>
                {this.state.saved ? (
                  <FontAwesomeIcon
                    icon={faClock}
                    className={classes.iconActive}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faClock}
                    className={classes.iconInactive}
                  />
                )}
                <span className={classes.title}>LATER</span>
              </div>

              <div className={classes.hover} onClick={this.toggleLike}>
                {this.state.liked ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={classes.iconActive}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeartBroken}
                    className={classes.iconInactive}
                  />
                )}
                <span className={classes.title}>{this.state.likesCount}</span>
              </div>
            </Col>
          </Row>
          <hr className={classes.hr} />
          <Row>
            <Col xs={{ span: 5, offset: 1 }}>
              <div className={classes.avatar}>
                <Avatar src={this.state.profilepic} />{" "}
                <span style={{ paddingLeft: "0.5rem" }}>
                  {this.state.channelName}
                  <br /> {this.state.subscribersCount} Subscribers
                </span>
              </div>
            </Col>
            <Col xs={5}>
              {this.state.isVideoMine ? null : this.state.subscribed ? (
                <Button
                  variant="contained"
                  style={{ marginLeft: "60%" }}
                  onClick={this.toggleSubscribe}
                >
                  SUBSCRIBED
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "60%" }}
                  onClick={this.toggleSubscribe}
                >
                  SUBSCRIBE
                </Button>
              )}
            </Col>
          </Row>
          <hr className={classes.hr} />
          <Row style={{ marginTop: "2rem" }}>
            <Col xs={{ span: 10, offset: 1 }}>
              <span>{this.state.commentCount} Comments</span> <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "1rem",
                }}
              >
                <Avatar src={localStorage.getItem("profilepic")} />
                <form onSubmit={this.submitComment}>
                  <input
                    type="text"
                    className={classes.commentInput}
                    placeholder="Add a public comment"
                    onChange={this.addComment}
                  />
                  <Button type="submit" variant="contained" color="secondary">
                    COMMENT
                  </Button>
                </form>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "2rem" }}>
            <Col xs={{ span: 10, offset: 1 }}>{comments}</Col>
          </Row>
        </Container>
      </SideBar>
    );
  }
}

export default VideoPlayer;
