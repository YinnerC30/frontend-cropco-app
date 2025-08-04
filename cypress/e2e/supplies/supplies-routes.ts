import { BASE_URL } from 'cypress/helpers/constants';

export const suppliesRoutes = {
  listAll() {
    return `${BASE_URL}supplies/view/all`;
  },
  create() {
    return `${BASE_URL}supplies/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}supplies/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}supplies/view/one/${id}`;
  },
};
