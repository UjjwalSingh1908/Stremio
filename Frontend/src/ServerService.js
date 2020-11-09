import axios from "axios";

const BASE_URL = "http://73a5bbaa4a57.ngrok.io/";

class ServerService {
  Signup(data) {
    return axios.post(BASE_URL + "signup", data);
  }

  Login(data) {
    return axios.post(BASE_URL + "login", data);
  }
}

export default new ServerService();
