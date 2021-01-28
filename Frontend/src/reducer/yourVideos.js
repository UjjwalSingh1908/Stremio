import { Constants } from "../action";

const initialState = null;

const yourVideos = (state = initialState, action) => {
  switch (action.type) {
    case Constants.YOUR_VIDEOS:
      return { ...state, yourvideos: action.payLoad };

    case Constants.DELETE_VIDEOS:
      console.log(action.payLoad);
      state.yourvideos.data.videodata.splice(action.payLoad, 1);
      console.log(state);
      return { ...state };
    default:
      return state;
  }
};

export default yourVideos;
