import { Constants } from "../action";

const initialState = null;

const yourVideos = (state = initialState, action) => {
  switch (action.type) {
    case Constants.YOUR_VIDEOS:
      return { ...state, yourvideos: action.payLoad };

    default:
      return state;
  }
};

export default yourVideos;
