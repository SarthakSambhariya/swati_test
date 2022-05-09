import http from "./httpservices";

export async function news(obj) {
    console.log(obj);
  const { data } = await http.post("/newsletter", obj);
  return data;
}

export default {
    news
}