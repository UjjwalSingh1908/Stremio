import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import TrendingPage from "./Components/TrendingPage/TrendingPage";
import Login from "./Components/Forms/Login";
import Signup from "./Components/Forms/Signup";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import SubscribedPage from "./Components/Subscribed/SubscribedPage";
import HistoryPage from "./Components/History/History";
import LikedPage from "./Components/LikedPage/LikedPage";
import WatchLater from "./Components/WatchLater'/WatchLater";
import YourVideos from "./Components/YourVideos/YourVideos";
import otherProfile from "./Components/ProfilePage/otherProfile";
import MyProfile from "./Components/ProfilePage/MyProfile";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/trending" component={TrendingPage} />
        <Route exact path="/subscribed" component={SubscribedPage} />
        <Route exact path="/history" component={HistoryPage} />
        <Route exact path="/likedvideos" component={LikedPage} />
        <Route exact path="/watchlater" component={WatchLater} />
        <Route exact path="/yourvideos" component={YourVideos} />
        <Route exact path="/videoplayer/:id" component={VideoPlayer} />
        <Route exact path="/profile/:id" component={otherProfile} />
        <Route exact path="/myprofile" component={MyProfile} />
      </BrowserRouter>
    );
  }
}

export default App;
