
import http from "./httpservices";

export async function review(obj) {
  const { data } = await http.post("/brandreview/", obj);
  return data;
}

export default {
    review
}