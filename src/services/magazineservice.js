import http from "./httpservices";

export async function getBlogsByCategory() {
  const { data } = await http.get("blogs/blogsbycategory");
  return data;
}

export async function getBlogsLimit() {
  const { data } = await http.get(`blogs/limit`);
  return data;
}

export async function getBlogById(id) {
  const { data } = await http.get(`blogs/${id}`);
  return data;
}

export async function getBlogByTitle(title) {
  const { data } = await http.get(`blogs/title/${title}`);
  return data;
}

export async function getMagazinesCategory(id) {
  const { data } = await http.get(`magazinescategory`);
  return data;
}

export async function getMagazinesCategoryFilterById(id) {
  const { data } = await http.get(`magazinescategory/filter/${id}`);
  return data;
}

export async function search(name) {
  const { data } = await http.post(`blogs/search/${name}`);
  return data;
}


export default {
  getBlogsByCategory,
  getBlogById,
  getBlogsLimit,
  getMagazinesCategory,
  getMagazinesCategoryFilterById,
  getBlogByTitle,
  search
}