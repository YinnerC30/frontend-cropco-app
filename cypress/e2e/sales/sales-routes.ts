import { BASE_URL } from 'cypress/helpers/constants';

export const salesRoutes = {
  listAll() {
    return `${BASE_URL}sales/view/all`;
  },
  create() {
    return `${BASE_URL}sales/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}sales/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}sales/view/one/${id}`;
  },
};
