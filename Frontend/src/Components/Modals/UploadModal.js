import React, { Component } from "react";
import classes from "./Modal.css";
import { Form, Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";

class UploadModal extends Component {
  state = {
    input: {
      title: "",
      description: "",
      category: "",
    },
    image: null,
    video: null,
  };

  inputHandler = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
      video: this.state.video,
    };
    console.log(data);

    const fd = new FormData();

    for (let formElement in data) {
      fd.append(formElement, data[formElement]);
      console.log(formElement, data[formElement]);
    }
  };

  imageHandler = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  videoHandler = (event) => {
    this.setState({ video: event.target.files[0] });
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
            marginLeft: "25%",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Upload New Video
        </Modal.Header>
        <Modal.Body>
          <Form className={classes.form} onSubmit={this.submitHandler}>
            <Form.Group>
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the video title"
                required
                className={classes.input}
                onChange={this.inputHandler}
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Video Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a short description of your video "
                required
                className={classes.input}
                onChange={this.inputHandler}
                name="description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                required
                className={classes.input}
                name="category"
                onChange={this.inputHandler}
              >
                <option>Music</option>
                <option>Gaming</option>
                <option>News</option>
                <option>Movies</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Video Thumbnail"
                onChange={this.imageHandler}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Video"
                required
                onChange={this.videoHandler}
              />
            </Form.Group>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UploadModal;
