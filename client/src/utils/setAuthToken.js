import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every requests
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete token
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
