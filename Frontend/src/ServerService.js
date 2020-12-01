import axios from "axios";
import { trackPromise } from "react-promise-tracker";

//const BASE_URL = "https://stremio--app.herokuapp.com/";
const BASE_URL = "https://dfa417d1528d.ngrok.io/";

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
    return axios.post(BASE_URL + id + "/subscribe", {
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

  WatchLater() {
    return axios.get(BASE_URL + "", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
}

export default new ServerService();
