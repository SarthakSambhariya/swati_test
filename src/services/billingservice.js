import http from "./httpservices";

export async function finalBilling(obj) {
  const { data } = await http.post("billings/", obj);
  return data;
}


export default {
    finalBilling
}