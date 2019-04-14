import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply to event request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete auth token
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
