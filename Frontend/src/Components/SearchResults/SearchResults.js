import React, { Component } from "react";
import SideBar from "../Navigation/Sidebar";
import VideoCard from "../VideoCard/VideoCard";
import { Container, Row } from "react-bootstrap";
import ServerService from "../../ServerService";

class SearchResults extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  componentDidUpdate() {
    console.log(this.props.match.params.id);
  }

  render() {
    // let videos = this.state.videos.map((data) => {
    //   return (
    //     <VideoCard
    //       key={data.id}
    //       id={data.id}
    //       title={data.title}
    //       videourl={"http://dfa417d1528d.ngrok.io " + data.videourl}
    //       channelname={data.user.name}
    //       profile={data.user.profilepic}
    //       views={data.viewsCount}
    //       date={data.createdAt}
    //     />
    //   );
    // });
    return (
      <React.Fragment>
        <SideBar>
          <section
            style={{
              backgroundColor: "#121212",
              minHeight: "100vh",
            }}
          >
            <Container fluid style={{ padding: "1.5rem" }}>
              {/* <Row>{videos}</Row> */}
            </Container>
          </section>
        </SideBar>
      </React.Fragment>
    );
  }
}

export default SearchResults;
