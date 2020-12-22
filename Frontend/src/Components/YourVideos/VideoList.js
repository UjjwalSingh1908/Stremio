import React, { Component } from "react";
import classes from "./YourVideos.css";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import dateFormat from "dateformat";
import ServerService from "../../ServerService";
import { connect } from "react-redux";
import { DeleteVideos } from "../../action";

class VideoList extends Component {
  deleteHandler = () => {
    let index = this.props.index;

    ServerService.DeleteVideo(this.props.id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.props.DeleteVideo(index);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <tr>
        <td>
          <Link to={"/videoplayer/" + this.props.id} className={classes.Link}>
            <img src={this.props.thumbnail} alt="" className={classes.img} />{" "}
            {this.props.title}
          </Link>{" "}
        </td>
        <td>{dateFormat(this.props.date, "mmmm dS, yyyy")}</td>
        <td> {this.props.views}</td>
        <td>{this.props.comments}</td>
        <td>{this.props.likes}</td>
        <td>
          {" "}
          <div className={classes.hover}>
            <DeleteIcon
              className={classes.deleteicon}
              onClick={this.deleteHandler}
            />
          </div>
        </td>
      </tr>
    );
  }
}
const mapStateToProps = (state) => ({
  yourvideos: state.yourvideos,
});

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteVideo: (id) => dispatch(DeleteVideos(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
