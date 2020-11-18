import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import TrendingPage from "./Components/TrendingPage/TrendingPage";
import Login from "./Components/Forms/Login";
import Signup from "./Components/Forms/Signup";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/trending" component={TrendingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </BrowserRouter>
    );
  }
}

export default App;
