import React, { Component } from "react";
import classes from "./TrendingPage.css";
import SideBar from "../Navigation/Sidebar";
import VideoList from "../VideoList/VideoList";
import { Col, Container, Row } from "react-bootstrap";
import ServerService from "../../ServerService";
import { BASE_URL } from "../../ServerService";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import { Route, Switch } from "react-router";
import TrendingCategories from "./TrendingCategories";
import gaming from "../../assets/gaming.png";
import movies from "../../assets/movies.png";
import music from "../../assets/music.png";
import news from "../../assets/news.png";
import { Link } from "react-router-dom";

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
                <Col xs={10}>
                  <Switch>
                    <Route
                      path="/trending"
                      exact
                      component={() => {
                        return (
                          <Row>
                            <Row>
                              <Col xs={3}>
                                <Link to="/trending/music">
                                  <img
                                    src={music}
                                    alt=""
                                    className={classes.category}
                                  />
                                </Link>{" "}
                                <div className={classes.categoryName}>
                                  Music
                                </div>
                              </Col>
                              <Col xs={3}>
                                <Link to="/trending/news">
                                  <img
                                    src={news}
                                    alt=""
                                    className={classes.category}
                                  />
                                </Link>
                                <div className={classes.categoryName}>News</div>
                              </Col>
                              <Col xs={3}>
                                <Link to="/trending/gaming">
                                  <img
                                    src={gaming}
                                    alt=""
                                    className={classes.category}
                                  />
                                </Link>
                                <div className={classes.categoryName}>
                                  Gaming
                                </div>
                              </Col>
                              <Col xs={3}>
                                <Link to="/trending/movies">
                                  <img
                                    src={movies}
                                    alt=""
                                    className={classes.category}
                                  />
                                </Link>
                                <div className={classes.categoryName}>
                                  Movies
                                </div>
                              </Col>
                            </Row>
                            <Row>{video}</Row>
                          </Row>
                        );
                      }}
                    />
                    <Route
                      path="/trending/:id"
                      exact
                      component={TrendingCategories}
                    />
                  </Switch>
                </Col>
              </Row>
              <Loader promiseTracker={usePromiseTracker} />
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default TrendingPage;
