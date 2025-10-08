import { BASE_URL } from 'cypress/helpers/constants';

export const shoppingRoutes = {
  listAll() {
    return `${BASE_URL}shopping/view/all`;
  },
  create() {
    return `${BASE_URL}shopping/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}shopping/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}shopping/view/one/${id}`;
  },
};
