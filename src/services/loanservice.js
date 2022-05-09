import http from "./httpservices";

export async function loans(obj) {
  const { data } = await http.post("loans/", obj);
  return data;
}


export default {
    loans
}