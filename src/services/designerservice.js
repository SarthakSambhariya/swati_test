import http from "./httpservices";

export async function likedDesigner(obj) {
  console.log(obj);
  const { data } = await http.post("designers/", obj);
  return data;
}

export async function getlikedDesignerByUserId(id) {
  const { data } = await http.post("designers/liked", {"userId": id});
  return data;
}

export async function getLikedDesigner(obj) {
  
  const { data } = await http.post("designers/liked/one", obj);
  return data;
}

export default {
  likedDesigner,
  getLikedDesigner,
  getlikedDesignerByUserId,
};
