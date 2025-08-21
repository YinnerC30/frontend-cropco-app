import { BASE_URL } from 'cypress/helpers/constants';

export const paymentsRoutes = {
  listAll() {
    return `${BASE_URL}payments/view/all`;
  },
  create() {
    return `${BASE_URL}payments/create/one`;
  },
  view(id: string) {
    return `${BASE_URL}payments/view/one/${id}`;
  },
};
