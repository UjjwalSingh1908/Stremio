import axios from "axios";
import { trackPromise } from "react-promise-tracker";

export const BASE_URL = "https://stremio--app.herokuapp.com/";
//const BASE_URL = "https://b1c8ce3f26f4.ngrok.io/";

class ServerService {
  Signup(data) {
    return trackPromise(axios.post(BASE_URL + "signup", data));
  }

  Login(data) {
    return trackPromise(axios.post(BASE_URL + "login", data));
  }

  Home() {
    return trackPromise(axios.get(BASE_URL + "home"));
  }

  VideoDetails(id) {
    return trackPromise(
      axios.get(BASE_URL + id + "/video", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  Like(id) {
    return axios.get(BASE_URL + id + "/like", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  Unlike(id) {
    return axios.get(BASE_URL + id + "/dislike", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  Subscribe(id) {
    return axios.get(BASE_URL + id + "/subscribe", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  Trending() {
    return trackPromise(axios.get(BASE_URL + "Trending"));
  }

  Comment(id, data) {
    return trackPromise(
      axios.post(BASE_URL + id + "/comment", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  AddToWatchLater(id) {
    return axios.get(BASE_URL + id + "/watchlater", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  Subscribed() {
    return trackPromise(
      axios.get(BASE_URL + "subscribedchannelFeed", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  History() {
    return trackPromise(
      axios.get(BASE_URL + "history", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  View(id) {
    return axios.get(BASE_URL + id + "/view", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  LikedVideos() {
    return trackPromise(
      axios.get(BASE_URL + "getlikedvideo", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  WatchLater() {
    return trackPromise(
      axios.get(BASE_URL + "watchlatervideos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  MyVideos() {
    return trackPromise(
      axios.get(BASE_URL + "watchlatervideos", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  RecommendedChannels() {
    return trackPromise(
      axios.get(BASE_URL + "recommendedchannels", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  Profile(id) {
    return trackPromise(
      axios.get(BASE_URL + id + "/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  UploadVideo(data) {
    return trackPromise(
      axios.post(BASE_URL + "uploadvideo", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  DeleteVideo(id) {
    return trackPromise(
      axios.delete(BASE_URL + id + "/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    );
  }

  EditProfile() {
    return trackPromise(
      axios.post("https://6c83e9c8572a.ngrok.io/" + "editprofile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Access-Control-Allow-Origin": "yes",
        },
      })
    );
  }
}

export default new ServerService();
