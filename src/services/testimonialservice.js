import http from "./httpservices";

export async function getTestimonials() {
  const { data } = await http.get("testimonials/");
  return data;
}

export default {
    getTestimonials
}