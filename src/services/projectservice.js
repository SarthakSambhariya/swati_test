import http from "./httpservices";

export async function getExploreProjects() {
  const { data } = await http.get("projects/");
  return data;
}

export async function getProjectDetails(id) {
  const { data } = await http.get(`projects/${id}`);
  return data;
}

export async function likedProjects(obj) {
  const { data } = await http.post("projects/", obj);
  return data;
}

export async function getlikedProjectsByUserId(id) {
  const { data } = await http.post("projects/liked", {"userId": id});
  return data;
}

export async function getLikedProjects(obj) {
  const { data } = await http.post("projects/liked/one", obj);
  return data;
}

export default {
  getExploreProjects,
  getProjectDetails,
  likedProjects,
  getLikedProjects,
  getlikedProjectsByUserId,
};
