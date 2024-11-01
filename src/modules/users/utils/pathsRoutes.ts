const BASE_PATH = '/app/home/users';

export const PATH_ROUTES_MODULE_USERS: Record<string, string> = {
  Home: `${BASE_PATH}/all`,
  Create: `${BASE_PATH}/create`,
  Update: `${BASE_PATH}/update/:id`,
  View: `${BASE_PATH}/view/:id`,
};
