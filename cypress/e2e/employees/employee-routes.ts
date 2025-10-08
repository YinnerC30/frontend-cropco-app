import { BASE_URL } from 'cypress/helpers/constants';

export const employeeRoutes = {
  listAll() {
    return `${BASE_URL}employees/view/all`;
  },
  create() {
    return `${BASE_URL}employees/create/one`;
  },
  update(id: string) {
    return `${BASE_URL}employees/update/one/${id}`;
  },
  view(id: string) {
    return `${BASE_URL}employees/view/one/${id}`;
  },
};
