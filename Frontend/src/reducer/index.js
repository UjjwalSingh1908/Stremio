import { combineReducers } from "redux";
import homeVideos from "./homeVideos";
import yourVideos from "./yourVideos";

export default combineReducers({
  home: homeVideos,
  yourvideos: yourVideos,
});
