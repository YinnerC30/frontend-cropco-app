import { BASE_URL } from 'cypress/helpers/constants';

export const consumptionsRoutes = {
  listAll() {
    return `${BASE_URL}consumptions/view/all`;
  },
  create() {
    return `${BASE_URL}consumptions/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}consumptions/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}consumptions/view/one/${id}`;
  },
};
