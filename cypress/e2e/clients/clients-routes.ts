import { BASE_URL } from 'cypress/helpers/constants';

export const clientsRoutes = {
  listAll() {
    return `${BASE_URL}clients/view/all`;
  },
  create() {
    return `${BASE_URL}clients/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}clients/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}clients/view/one/${id}`;
  },
};
