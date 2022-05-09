
import http from "./httpservices";

export async function getUserReview(obj) {
  const { data } = await http.post("/review/designer", obj);
  return data;
}

export default {
    getUserReview
}