const BASE_PATH = 'users';

type UserRoutes = 'ViewAll' | 'Create' | 'Update' | 'ViewOne';

export const MODULE_USER_PATHS: Record<UserRoutes, string> = {
  ViewAll: `${BASE_PATH}/all`,
  Create: `${BASE_PATH}/create`,
  Update: `${BASE_PATH}/update/:id`,
  ViewOne: `${BASE_PATH}/view/:id`,
};
