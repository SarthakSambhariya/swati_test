import http from "./httpservices";

export async function finalQuotes(obj) {
  const { data } = await http.post("quotes/", obj);
  return data;
}


export default {
    finalQuotes
}