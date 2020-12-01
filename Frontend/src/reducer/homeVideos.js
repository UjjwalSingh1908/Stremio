import { Constants } from "../action";

const initialState = null;

const homeVideos = (state = initialState, action) => {
  switch (action.type) {
    case Constants.HOME_VIDEOS:
      return { ...state, home: action.payLoad };

    default:
      return state;
  }
};

export default homeVideos;
