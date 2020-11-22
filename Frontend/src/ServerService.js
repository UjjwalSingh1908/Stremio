import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const BASE_URL = "https://stremio--app.herokuapp.com/";

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
}

export default new ServerService();
