import { Constants } from "../action";
import ServerService from "../ServerService";

export const HomeVideos = (response) => {
  return {
    type: Constants.HOME_VIDEOS,
    payLoad: response,
  };
};

export const AssyncHomeVideos = () => {
  return (dispatch) => {
    ServerService.Home()
      .then((response) => {
        console.log("Response:", response);

        if (
          response.status === 201 ||
          response.status === 200 ||
          response.status === 202
        ) {
          dispatch(HomeVideos(response.data));
        }
      })

      .catch((error) => {
        //something
      });
  };
};
