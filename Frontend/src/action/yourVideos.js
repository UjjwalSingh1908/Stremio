import { Constants } from "../action";
import ServerService from "../ServerService";

export const YourVideos = (response) => {
  return {
    type: Constants.YOUR_VIDEOS,
    payLoad: response,
  };
};

export const DeleteVideos = (index) => {
  return {
    type: Constants.DELETE_VIDEOS,
    payLoad: index,
  };
};

export const AssyncYourVideos = () => {
  return (dispatch) => {
    ServerService.Profile(localStorage.getItem("id"))
      .then((response) => {
        //console.log("Response:", response);

        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === 202
        ) {
          dispatch(YourVideos(response.data));
        }
      })

      .catch((error) => {
        //something
      });
  };
};
