const HOME_URL = "/";
const isActiveTab = (id, key, path) =>
  path === `${HOME_URL}${id}` || (path === `${HOME_URL}` && !key);
