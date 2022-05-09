import http from "./httpservices";

export async function getExploreProjects() {
  const { data } = await http.get("projects/");
  return data;
}

export default {
    getExploreProjects
}