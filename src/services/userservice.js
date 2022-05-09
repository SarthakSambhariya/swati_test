import http from "./httpservices";

export async function getDesignersByUser(id) {
  console.log(id)
  const { data } = await http.get(`user/${id}/designers`);
  return data;
}

export async function getBlogsByUser(id) {
  const { data } = await http.get(`user/${id}/blogs`);
  return data;
}

export async function getBlogByUser(id) {
  const { data } = await http.get(`user/${id}/blog`);
  return data;
}

export async function getProjectsByUser(id) {
  const { data } = await http.get(`user/${id}/projects`);
  return data;
}

export async function getSingleUser(id) {
  const { data } = await http.get(`user/me`);
  return data;
}


export async function reviews(review) {
  const { data } = await http.post(`review`,review);
  return data;
}

export async function googleAuth(token) {
  const { data } = await http.post("user/googleauth",{token});
  return data;
}

export default {
  getDesignersByUser,
  getBlogsByUser,
  getProjectsByUser,
  getSingleUser,
  reviews,
  googleAuth
};
