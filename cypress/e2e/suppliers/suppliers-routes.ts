import { BASE_URL } from 'cypress/helpers/constants';

export const suppliersRoutes = {
  listAll() {
    return `${BASE_URL}suppliers/view/all`;
  },
  create() {
    return `${BASE_URL}suppliers/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}suppliers/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}suppliers/view/one/${id}`;
  },
};
