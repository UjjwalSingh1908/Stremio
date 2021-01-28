import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { ReactSmartScroller } from "react-smart-scroller";
import classes from "./Modal.css";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

class ShareModal extends Component {
  state = {
    copySuccess: "",
  };

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Link Copied!" });
  };

  render() {
    return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={this.props.onHide}
        contentClassName={classes.dialog}
      >
        <Modal.Header
          closeButton
          style={{
            border: "none",
            height: "0.8rem",
          }}
        >
          SHARE
        </Modal.Header>
        <Modal.Body>
          <ReactSmartScroller
            pagination
            numCols={5}
            paginationConfig={{
              activeDotColor: "#ff2f5b",
            }}
          >
            <EmailShareButton url={window.location}>
              <EmailIcon round className={classes.iconsize} />
            </EmailShareButton>
            <WhatsappShareButton url={window.location}>
              <WhatsappIcon round className={classes.iconsize} />
            </WhatsappShareButton>
            <FacebookShareButton url={window.location}>
              <FacebookIcon round className={classes.iconsize} />
            </FacebookShareButton>

            <LinkedinShareButton url={window.location}>
              <LinkedinIcon round className={classes.iconsize} />
            </LinkedinShareButton>
            <PinterestShareButton url={window.location}>
              <PinterestIcon round className={classes.iconsize} />
            </PinterestShareButton>
            <PocketShareButton url={window.location}>
              <PocketIcon round className={classes.iconsize} />
            </PocketShareButton>

            <RedditShareButton url={window.location}>
              {" "}
              <RedditIcon round className={classes.iconsize} />
            </RedditShareButton>
            <TwitterShareButton url={window.location}>
              <TwitterIcon round className={classes.iconsize} />
            </TwitterShareButton>
            <TelegramShareButton url={window.location}>
              <TelegramIcon round className={classes.iconsize} />
            </TelegramShareButton>
            <TumblrShareButton url={window.location}>
              <TumblrIcon round className={classes.iconsize} />
            </TumblrShareButton>
          </ReactSmartScroller>

          <form style={{ display: "flex" }}>
            <textarea
              ref={(textarea) => (this.textArea = textarea)}
              defaultValue={window.location}
              className={classes.textArea}
            />

            <Button
              style={{ height: "2.5rem", margin: "1rem" }}
              variant="secondary"
              onClick={this.copyToClipboard}
            >
              Copy
            </Button>
          </form>
          {this.state.copySuccess}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ShareModal;
