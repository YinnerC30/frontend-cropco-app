import { BASE_URL } from 'cypress/helpers/constants';

export const cropsRoutes = {
  listAll() {
    return `${BASE_URL}crops/view/all`;
  },
  create() {
    return `${BASE_URL}crops/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}crops/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}crops/view/one/${id}`;
  },
};
