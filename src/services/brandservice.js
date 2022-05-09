import http from "./httpservices";

export async function getBrandCategories() {
  const { data } = await http.get("brandcategories/");
  return data;
}


export async function getBrands(skip) {
  const { data } = await http.post("brands/",{"skip": skip});
  return data;
}

export async function getBrandsByCategory(id) {
  const { data } = await http.get(`brands/filter/${id}`);
  return data;
}


export async function getBrandDetails(id) {
  const { data } = await http.get(`brands/${id}`);
  return data;
}

export async function getBrandsByCity(name) {
  const { data } = await http.get(`brands/filter/city/${name}`);
  return data;
}

export default {
    getBrandCategories,
    getBrands,
    getBrandsByCategory,
    getBrandsByCity,
    getBrandDetails
}