import { BASE_URL } from 'cypress/helpers/constants';

export const usersRoutes = {
  listAll() {
    return `${BASE_URL}users/view/all`;
  },
  create() {
    return `${BASE_URL}users/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}users/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}users/view/one/${id}`;
  },
};
