import { Avatar, Button } from "@material-ui/core";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
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
      ServerService.Subscribe(this.props.userId)
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
            <Col md={4} xs={2}>
              <Link
                to={"profile/" + this.props.userId}
                className={classes.link}
              >
                <Avatar
                  src={this.props.profilepic}
                  className={classes.profileimage}
                />
              </Link>
            </Col>
            <Col md={5} xs={6} className={classes.content}>
              <span className={classes.channelName}>{this.props.name}</span>{" "}
              <br />
              <span className={classes.details}>
                {" "}
                {this.props.subscriberCount} Subscribers <br />
                {this.props.about}
              </span>
            </Col>

            <Col md={3} xs={3}>
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

          <hr className={classes.hr} />
        </Container>
      </React.Fragment>
    );
  }
}

export default ChannelCard;
