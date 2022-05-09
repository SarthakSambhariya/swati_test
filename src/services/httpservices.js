import axios from "axios";
import constants from "../services/constants";
// axios.defaults.baseURL = "https://idiotic.pythonanywhere.com/api/";
axios.defaults.baseURL = constants.api;


axios.interceptors.response.use(null, (error) => {
  // alert("An unexpected Error Occured");
  return Promise.reject(error);
});

function setToken(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};
