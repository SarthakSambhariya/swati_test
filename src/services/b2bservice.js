const LISTING_API = process.env.REACT_APP_LISTDESIGNERS;
const PROJECTS_API = process.env.REACT_APP_LISTPROJECTS;
const LEADPUSH_API = process.env.REACT_APP_LEADPUSH;

export async function getlistDesigners() {
  const response = await fetch(LISTING_API);
  const designer = await response.json();
  return designer["data"]["data"];
}

export async function getlistProjects() {
  const response = await fetch(PROJECTS_API);
  const projects = await response.json();
  return projects["data"]["data"];
}

export async function getlistDesignersFilter(params) {
  const response = await fetch(`${LISTING_API}&${params}`);
  const designer = await response.json();
  return designer["data"]["data"];
}

export async function getlistDesignersFilter2(params) {
  const response = await fetch(`${LISTING_API}&${params}`);
  const designer = await response.json();
  return designer["data"];
}

export async function getlistProjectsFilter(params) {
  const response = await fetch(`${PROJECTS_API}&${params}`);
  const projects = await response.json();
  return projects["data"]["data"];
}

export async function getlistProjectsFilter2(params) {
  const response = await fetch(`${PROJECTS_API}&${params}`);
  const projects = await response.json();
  return projects["data"];
}



export async function leadPush(object) {
  console.log(object);
  const response = await fetch(LEADPUSH_API,{method:"POST", body: object});
  const projects = await response.json();
  return projects["statusCode"];
}


export default {
  getlistDesigners,
  getlistProjects,
  getlistDesignersFilter,
  getlistDesignersFilter2,
  getlistProjectsFilter2,
  getlistProjectsFilter,
  leadPush
};
