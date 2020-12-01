import { combineReducers } from "redux";
import homeVideos from "./homeVideos";

export default combineReducers({
  home: homeVideos,
});
