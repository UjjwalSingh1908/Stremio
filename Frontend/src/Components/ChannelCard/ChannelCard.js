import { Avatar, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ServerService from "../../ServerService";
import classes from "./ChannelCard.css";

class ChannelCard extends Component {
  state = {
    subscribed: false,
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
          console.log(err.response);
        });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={4}>
              <Avatar src=" " className={classes.profileimage}></Avatar>
            </Col>
            <Col xs={6}>
              <span className={classes.channelName}>Channel Name</span> <br />
              <span className={classes.details}>
                {" "}
                24.5M Subscribers . 172 Videos <br />
                Description
              </span>
            </Col>
            <Col xs={2}>
              {this.state.subscribed ? (
                <Button
                  variant="contained"
                  onClick={this.toggleSubscribe}
                  className={classes.button}
                >
                  SUBSCRIBED
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.toggleSubscribe}
                  className={classes.button}
                >
                  SUBSCRIBE
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default ChannelCard;
