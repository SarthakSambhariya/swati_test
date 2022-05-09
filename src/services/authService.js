import http from "./httpservices";
import jwtDecode from "jwt-decode";

const tokenKey = "itoken";
const id = "id";

export function generate(token) {
  try {
    const user = jwtDecode(token);
    localStorage.setItem(tokenKey, token);
    localStorage.setItem("id", user["_id"]);
    window.location.href="/findprofessionals";
  } catch (error) {
    window.location.href="/"
  }
}

export async function login(loginData) {
  const { data: token } = await http.post("auth/", loginData);

  if (token) {
    generate(token);
  } else {
    alert("something fail while login");
  }
  return token;
}

export function loginwithtoken(token) {
  localStorage.setItem(tokenKey, token);
}

export function getToken() {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    return token;
  } else {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
  return true;
}

export function apiLogout() {}

export function getLocalStorage(name) {
  const result = localStorage.getItem(name);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export function getLocalStorageObj() {
  return {
    user_id: getLocalStorage("id"),
    token: getLocalStorage("token"),
    profile_id: getLocalStorage("profile_id"),
  };
}

export async function sendingOTP() {
  const { data } = await http.get("sendingotp/", {
    params: getLocalStorageObj(),
  });
  return data;
}

export async function register(userdata) {
  const response = await http.post(`user/`, userdata);
  // console.log(response.headers["x-auth-token"]);
  const data = response.data;
  localStorage.setItem(tokenKey, data[tokenKey]);

  return data;
}

export function getApiPath() {
  return process.env.REACT_APP_API_URL;
}

export default {
  getToken,
  logout,
  login,
  getApiPath,
  loginwithtoken,
  getLocalStorage,
  getLocalStorageObj,
  register,
  generate,
};
